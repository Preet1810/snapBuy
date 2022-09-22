const express=require('express');
const route=express.Router();
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressErrors');
const Product=require('../model/products');
const { productSchema }=require('../schemas.js');

const validateCampground=(req, res, next) => {
    const { error }=productSchema.validate(req.body);
    if (error) {
        const msg=error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

route.get('/', catchAsync(async (req, res) => {
    const products=await Product.find({})                           //all products
    res.render('products/index', { products });
}))
route.get('/new', catchAsync(async (req, res) => {                          //new product page
    res.render('products/new');
}))

route.post('/', validateCampground, catchAsync(async (req, res, next) => {
    const product=new Product(req.body.product);
    await product.save();                                       //CREATING NEW PRODUCT
    req.flash('success', 'Successfully Made A New Product');    //FLASH
    res.redirect(`/products/${product._id}`)

}))

route.get('/:id', catchAsync(async (req, res) => {
    const product=await Product.findById(req.params.id).populate('reviews')     //show page  populating reviews so that those object id will also have the body of review
    // console.log(product);
    res.render('products/show', { product });
}))

route.get('/:id/edit', catchAsync(async (req, res) => {
    const product=await Product.findById(req.params.id)      //edit form
    res.render('products/edit', { product });
}))

route.put('/:id', validateCampground, catchAsync(async (req, res) => {
    const { id }=req.params;
    const product=await Product.findByIdAndUpdate(id, { ...req.body.product });   //editing
    res.redirect(`/products/${product._id}`)
}));

route.delete('/:id', async (req, res) => {
    const { id }=req.params;
    await Product.findByIdAndDelete(id);        //delete
    res.redirect('/products');
})

module.exports=route;