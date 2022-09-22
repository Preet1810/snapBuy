const express=require('express');
const route=express.Router();
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressErrors');
const Product=require('../model/products');





route.get('/:id', catchAsync(async (req, res) => {
    const { id }=req.params;
    const catPage=await Product.find({ categories: `${id}` })
    res.render('products/category', { catPage });
}))

module.exports=route;