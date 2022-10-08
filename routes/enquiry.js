const express=require('express');
const route=express.Router({});
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressErrors');
const Enquiry=require('../model/enquiry');
const Seller=require('../model/seller');

const { isLoggedIn, isUser }=require('../middleware');

route.post('/', isLoggedIn, isUser, catchAsync(async (req, res) => {
    const enquiry=new Enquiry(req.body);
    console.log(enquiry)
    enquiry.author=req.user._id;
    const seller=await Seller.find({ companyname: (enquiry.seller) });
    console.log(seller)
    seller[0].enquiries.push(enquiry);
    await seller[0].save();
    await enquiry.save();
    req.flash('success', 'Successfully Sent Enquiry to Seller');
    res.redirect(`/products`);
    // console.log(enquiry)
    // console.log(seller)
}))

module.exports=route;