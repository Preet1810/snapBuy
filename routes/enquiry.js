const express=require('express');
const route=express.Router({});
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressErrors');
const Enquiry=require('../model/enquiry');
const Seller=require('../model/seller');

const { isLoggedIn, isUser, isSeller, validateEnquiry }=require('../middleware');

route.post('/', isLoggedIn, validateEnquiry, catchAsync(async (req, res) => {
    const enquiry=new Enquiry(req.body.enquiry);
    enquiry.author=req.user._id;
    const seller=await Seller.find({ companyname: (enquiry.seller) });
    // console.log(seller)
    seller[0].enquiries.push(enquiry);
    await seller[0].save();
    await enquiry.save();
    req.flash('success', 'Successfully Sent Enquiry to Seller');
    const redirectUrl=req.session.returnTo||"/products";
    res.redirect(redirectUrl);
    // console.log(enquiry)
    // console.log(seller)
}))

// route.delete('/:enquiryid', isLoggedIn, isSeller, catchAsync(async (req, res) => {
//     const { enquiryid }=req.params;
//     await Enquiry.findByIdAndDelete(enquiryid)
//     req.flash('success', 'Successfully Deleted a Enquiry');
//     res.redirect(`/seller/enquiry`);
// }))

module.exports=route;