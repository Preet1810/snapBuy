const express=require('express');
const route=express.Router();
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressErrors');
const Product=require('../model/products');
const Seller=require('../model/seller');
const { isLoggedIn, isSeller }=require('../middleware')

route.get('/company', isLoggedIn, isSeller, catchAsync(async (req, res) => {
    const seller=await Seller.findById(`${req.user._id}`)
    res.render('users/seller/company', { seller })
}))

route.get('/dashboard', isLoggedIn, isSeller, catchAsync(async (req, res) => {
    const totalProducts=await Product.find({ author: (`${req.user._id}`) })
    res.render('users/seller/dashboard', { totalProducts })
}))



module.exports=route;
