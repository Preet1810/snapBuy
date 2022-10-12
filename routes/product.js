const express=require('express');
const route=express.Router();
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressErrors');
const Product=require('../model/products');
const { isLoggedIn, isAuthor, validateProduct, isSeller }=require('../middleware');
const Seller=require('../model/seller');

route.get('/', catchAsync(async (req, res) => {
    let noMatch=null;
    if (req.query.search) {
        const regex=new RegExp(escapeRegex(req.query.search), 'gi');
        const page=parseInt(req.query.page)-1||0;
        const limit=parseInt(req.query.limit)||9;
        const products=await Product.find({ title: regex }).populate('author').skip(page*limit).limit(limit);
        const totalPages=await Product.countDocuments({ title: regex })
        // console.log(totalPages)
        const response={
            error: false,
            totalPages,
            page: page+1,
            limit,
        };
        console.log(response.page)
        if (totalPages<1) {
            noMatch="No Products match that query, please try again.";
        }
        res.render('products/index', { response, products, noMatch });
    } else {
        const page=parseInt(req.query.page)-1||0;
        const limit=parseInt(req.query.limit)||9;
        const products=await Product.find({}).populate('author').skip(page*limit).limit(limit);                       //all products
        const totalPages=await Product.countDocuments({})
        console.log(totalPages)
        const response={
            error: false,
            totalPages,
            page: page+1,
            limit,
        };
        res.render('products/index', { products, noMatch, response });
    }
}))
route.get('/new', isLoggedIn, isSeller, (req, res) => {                          //new product page
    res.render('products/new');
})

route.post('/', isLoggedIn, isSeller, validateProduct, catchAsync(async (req, res, next) => {
    const product=new Product(req.body.product);              //CREATING NEW PRODUCT 63355666d4c25e7696191ba2
    product.author=req.user._id;
    console.log(product.author);
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
    }).populate('author');              //show page  populating reviews so that those object id will also have the body of review
    console.log(product.reviews)
    if (!product) {
        req.flash('error', 'Cannot find that Product!');
        return res.redirect('/products')
    }
    res.render('products/show', { product });
}))

route.get('/:id/edit', isLoggedIn, isSeller, isAuthor, catchAsync(async (req, res) => {
    const product=await Product.findById(req.params.id)      //edit form
    if (!product) {
        req.flash('error', 'Cannot find that Product!');
        return res.redirect('/products')
    }
    res.render('products/edit', { product });
}))

route.put('/:id', isLoggedIn, isSeller, isAuthor, validateProduct, catchAsync(async (req, res) => {
    const { id }=req.params;
    const product=await Product.findByIdAndUpdate(id, { ...req.body.product });   //editing
    req.flash('success', 'Successfully Edited the Product');
    res.redirect(`/products/${product._id}`)
}));

route.delete('/:id', isLoggedIn, isSeller, isAuthor, catchAsync(async (req, res) => {
    const { id }=req.params;
    await Product.findByIdAndDelete(id);        //delete
    req.flash('success', 'Successfully Deleted');
    res.redirect('/seller/products');
}))

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports=route;