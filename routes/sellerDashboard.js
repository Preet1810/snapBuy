const express=require('express');
const route=express.Router();
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressErrors');
const Product=require('../model/products');
const Seller=require('../model/seller');
const Enquiry=require('../model/enquiry')
const { isLoggedIn, isSeller }=require('../middleware')

const multer=require('multer');
const { storage, cloudinary }=require('../cloudinary');
const { findById }=require('../model/products');
const upload=multer({ storage });

route.get('/seller/dashboard', isLoggedIn, isSeller, catchAsync(async (req, res) => {
    const totalProducts=await Product.find({ author: (`${req.user._id}`) })
    const currentSeller=await Seller.findById((`${req.user._id}`))
    res.render('users/seller/dashboard', { totalProducts, currentSeller })
}))

route.get('/seller/company', isLoggedIn, isSeller, catchAsync(async (req, res) => {
    const seller=await Seller.findById(`${req.user._id}`)
    res.render('users/seller/company', { seller })
}))

route.post('/seller/company', isLoggedIn, isSeller, upload.array('image'), catchAsync(async (req, res) => {
    try {
        const seller=await Seller.findByIdAndUpdate(`${req.user._id}`, req.body);
        if (req.files.length>0) {
            const realSeller=await Seller.findById(`${req.user._id}`);
            const filename=realSeller.image[0].filename;
            await cloudinary.uploader.destroy(filename);
            await Seller.findByIdAndUpdate(`${req.user._id}`, { $set: { image: [] } });
            const imgs=req.files.map(f => ({ url: f.path, filename: f.filename }));
            seller.image.push(...imgs);
            await seller.save();
        }
        req.flash('success', 'Successfully Edited Your Profile');
        res.redirect('/seller/dashboard');
    }
    catch (e) {
        req.flash('error', e.message)
        res.redirect('/seller/company')
    }
}))

route.get('/seller/products', isLoggedIn, isSeller, catchAsync(async (req, res) => {
    const products=await Product.find({ author: (`${req.user._id}`) });
    res.render('users/seller/products', { products });
}))

route.get('/seller/enquiry', isLoggedIn, isSeller, catchAsync(async (req, res) => {
    const seller=await Seller.findById(`${req.user._id}`).populate({
        path: 'enquiries',
        populate: {
            path: "enquiryFromUser enquiryFromSeller"
        }
    });
    // console.log(seller.enquiries)

    res.render('users/seller/enquiries', { seller })
}))

route.delete('/seller/enquiry/:enquiryid', isLoggedIn, isSeller, catchAsync(async (req, res) => {
    const { enquiryid }=req.params;
    const sellerId=req.user._id;
    await Seller.findByIdAndUpdate(sellerId, { $pull: { enquiries: enquiryid } });
    await Enquiry.findByIdAndDelete(enquiryid);
    req.flash('success', 'Successfully Deleted a Enquiry');
    res.redirect(`/seller/enquiry`);
}))

route.get('/seller/:id', catchAsync(async (req, res) => {
    const { id }=req.params;
    const page=parseInt(req.query.page)-1||0;
    const limit=parseInt(req.query.limit)||9;
    const seller=await Seller.find({ companyname: (id) })
    const products=await Product.find({ author: (seller[0]._id) }).populate('author').skip(page*limit).limit(limit);
    const totalPages=await Product.countDocuments({ author: (seller[0]._id) })
    const response={
        error: false,
        totalPages,
        page: page+1,
        limit,
    };
    res.render('users/seller/sellerPage', { seller, products, response })
}))






module.exports=route;
