const express=require('express');
const route=express.Router();
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressErrors');
const Product=require('../model/products');
const Seller=require('../model/seller');
const { isLoggedIn, isSeller }=require('../middleware')

route.get('/seller/dashboard', isLoggedIn, isSeller, catchAsync(async (req, res) => {
    const totalProducts=await Product.find({ author: (`${req.user._id}`) })
    res.render('users/seller/dashboard', { totalProducts })
}))

route.get('/seller/company', isLoggedIn, isSeller, catchAsync(async (req, res) => {
    const seller=await Seller.findById(`${req.user._id}`)
    res.render('users/seller/company', { seller })
}))

route.post('/seller/company', isLoggedIn, isSeller, catchAsync(async (req, res) => {
    // res.send(req.body);
    try {
        const seller=await Seller.findByIdAndUpdate(`${req.user._id}`, req.body);
        req.flash('success', 'Successfully Edited the Product');
        res.redirect('/dashboard');
    }
    catch (e) {
        req.flash('error', e.message)
        res.redirect('/company')
    }
}))

route.get('/seller/products', isLoggedIn, isSeller, catchAsync(async (req, res) => {
    const products=await Product.find({ author: (`${req.user._id}`) });
    res.render('users/seller/products', { products });
}))






module.exports=route;
