const express=require('express');
const passport=require('passport');
const route=express.Router();
const Seller=require('../model/seller');
const catchAsync=require('../utils/catchAsync')

route.get('/register/seller', (req, res) => {
    res.render('users/sellerRegister')
});

route.post('/register/seller', catchAsync(async (req, res, next) => {
    try {
        const { proprietorname, companyname, address, contactnumber, email, username, password }=req.body;
        const seller=new Seller({ proprietorname, companyname, address, contactnumber, email, username });
        const registeredSeller=await Seller.register(seller, password);
        req.login(registeredSeller, err => {                              //after registering it logins the registered user
            if (err) return next(err);
            req.flash('success', 'SELLER LOGIN');
            res.redirect('/products');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register/seller')
    }

}));


route.get('/login/seller', (req, res) => {
    res.render('users/sellerLogin')

})
route.post('/login/seller', passport.authenticate('sellerLocal', { failureFlash: true, failureRedirect: '/login/seller', keepSessionInfo: true, }), (req, res) => { //a authentication middleware by passport you can add google fb twiiter too insted of just local
    req.flash('success', 'yooooo');
    const redirectUrl=req.session.returnTo||"/products";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

module.exports=route;