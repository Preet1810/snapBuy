const express=require('express');
const route=express.Router({ mergeParams: true });
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressErrors');
const Review=require('../model/reviews');
const Product=require('../model/products');

const { reviewSchema, }=require('../schemas.js');

const validateReview=(req, res, next) => {
    const { error }=reviewSchema.validate(req.body);
    if (error) {
        const msg=error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


route.post('/', validateReview, catchAsync(async (req, res) => {
    const product=await Product.findById(req.params.id)
    const review=new Review(req.body.review);
    product.reviews.push(review);
    await product.save();
    await review.save();
    req.flash('success', 'Successfully Made A New Review');
    res.redirect(`/products/${product._id}`);
}))

route.delete('/:reviewid', catchAsync(async (req, res) => {
    const { id, reviewid }=req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewid } }); //in campground pulling from the reviews array where we have reviewid
    await Review.findByIdAndDelete(reviewid);
    req.flash('success', 'Successfully Deleted a Review');
    res.redirect(`/products/${id}`);

}))

module.exports=route;