const express=require('express');
const route=express.Router({ mergeParams: true });
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressErrors');
const Review=require('../model/reviews');
const Product=require('../model/products');
const { validateReview, isLoggedIn, isReviewAuthor }=require('../middleware')


route.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const product=await Product.findById(req.params.id)
    const review=new Review(req.body.review);
    console.log(review);
    review.author=req.user._id;
    product.reviews.push(review);
    await product.save();
    await review.save();
    req.flash('success', 'Successfully Made A New Review');
    res.redirect(`/products/${product._id}`);
}))

route.delete('/:reviewid', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewid }=req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewid } }); //in campground pulling from the reviews array where we have reviewid
    await Review.findByIdAndDelete(reviewid);
    req.flash('success', 'Successfully Deleted a Review');
    res.redirect(`/products/${id}`);

}))

module.exports=route;