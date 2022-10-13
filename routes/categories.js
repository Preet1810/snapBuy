const express=require('express');
const route=express.Router();
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressErrors');
const Product=require('../model/products');





route.get('/:id', catchAsync(async (req, res) => {
    const page=parseInt(req.query.page)-1||0;
    const limit=parseInt(req.query.limit)||9;
    const { id }=req.params;
    const catPage=await Product.find({ categories: `${id}` }).skip(page*limit).limit(limit);
    const totalPages=await Product.countDocuments({ categories: `${id}` })
    // console.log(totalPages)
    const response={
        error: false,
        totalPages,
        page: page+1,
        limit,
    };
    res.render('products/category', { catPage, response });
}))

module.exports=route;