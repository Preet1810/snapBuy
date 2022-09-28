const express=require('express');
const route=express.Router();
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressErrors');
const Product=require('../model/products');
const { isLoggedIn, isAuthor, validateCampground }=require('../middleware')

route.get('/', catchAsync(async (req, res) => {
    const products=await Product.find({})                           //all products
    res.render('products/index', { products });
}))
route.get('/new', isLoggedIn, (req, res) => {                          //new product page
    res.render('products/new');
})

route.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    const product=new Product(req.body.product);              //CREATING NEW PRODUCT
    product.author=req.user._id;
    await product.save();
    req.flash('success', 'Successfully Made A New Product');    //FLASH
    res.redirect(`/products/${product._id}`)

}))

route.get('/:id', catchAsync(async (req, res) => {
    const product=await Product.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');                //show page  populating reviews so that those object id will also have the body of review
    if (!product) {
        req.flash('error', 'Cannot find that Product!');
        return res.redirect('/products')
    }
    res.render('products/show', { product });
}))

route.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const product=await Product.findById(req.params.id)      //edit form
    if (!product) {
        req.flash('error', 'Cannot find that Product!');
        return res.redirect('/products')
    }
    res.render('products/edit', { product });
}))

route.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const { id }=req.params;
    const product=await Product.findByIdAndUpdate(id, { ...req.body.product });   //editing
    req.flash('success', 'Successfully Edited the Product');
    res.redirect(`/products/${product._id}`)
}));

route.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id }=req.params;
    await Product.findByIdAndDelete(id);        //delete
    req.flash('success', 'Successfully Deleted');
    res.redirect('/products');
}))

module.exports=route;