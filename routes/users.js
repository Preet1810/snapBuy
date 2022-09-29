
const express=require('express');
const passport=require('passport');
const route=express.Router();
const User=require('../model/user');
const catchAsync=require('../utils/catchAsync')

route.get('/register', (req, res) => {
    res.render('users/middleFile')
});

route.get('/register/buyer', (req, res) => {
    res.render('users/buyerRegister')
});

route.post('/register/buyer', catchAsync(async (req, res, next) => {
    // res.send(req.body);
    try {
        const { email, username, password }=req.body;
        const user=new User({ email, username });
        const registeredUser=await User.register(user, password);       //registering user
        req.login(registeredUser, err => {                              //after registering it logins the registered user
            if (err) return next(err);
            req.flash('success', 'Welcome to SnapBuy');
            res.redirect('/products');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register/buyer')
    }
}));


route.get('/login/buyer', (req, res) => {
    res.render('users/buyerLogin')

})

route.post('/login/buyer', passport.authenticate('userLocal', { failureFlash: true, failureRedirect: '/login/buyer', keepSessionInfo: true, }), (req, res) => { //a authentication middleware by passport you can add google fb twiiter too insted of just local
    req.flash('success', 'Welcome Back');
    const redirectUrl=req.session.returnTo||"/products";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

route.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/products');


    // req.logout(function (err) {
    //     if (err) { return next(err); }
    //     req.flash('success', "Goodbye!");
    //     res.redirect('/products');
    // });

});

module.exports=route;