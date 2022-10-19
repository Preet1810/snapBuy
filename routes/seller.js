const express=require('express');
const passport=require('passport');
const route=express.Router();
const Seller=require('../model/seller');
const catchAsync=require('../utils/catchAsync')
// const { find }=require('../middleware');

route.get('/register/seller', (req, res) => {
    res.render('users/seller/sellerRegister')
});

route.post('/register/seller', catchAsync(async (req, res, next) => {
    try {
        const { proprietorname, companyname, address, contactNumber, email, nature, image, aboutcompany, username, password }=req.body;
        const seller=new Seller({ proprietorname, companyname, address, contactNumber, email, nature, image, aboutcompany, username });
        const registeredSeller=await Seller.register(seller, password);
        req.login(registeredSeller, err => {                              //after registering it logins the registered user
            if (err) return next(err);
            req.user.isSeller=true;
            req.flash('success', 'Welcome to SnapBuy');
            res.redirect('/products');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register/seller')
    }

}));


route.get('/login/seller', (req, res) => {
    res.render('users/seller/sellerLogin')

})
route.post('/login/seller', passport.authenticate('sellerLocal', { failureFlash: true, failureRedirect: '/login/seller', keepSessionInfo: true, }), (req, res) => { //a authentication middleware by passport you can add google fb twiiter too insted of just local
    req.user.isSeller=true;
    req.flash('success', 'yooooo');
    const redirectUrl=req.session.returnTo||"/products";
    res.redirect(redirectUrl);
});



// route.use('/login/seller', function adminContext(req, res, next) {
//     // set admin context
//     req.isAdmin=true;

//     next();
// });

// route.use(function getUserRoles(req, res, next) {
//     req.userRoleNames=[];

//     if (req.isAuthenticated()) {
//         req.userRoleNames.push('authenticated');
//     } else {
//         req.userRoleNames.push('unAuthenticated');
//         return next(); // skip role load if dont are authenticated
//     }

//     // get user roles, you may get roles from DB ...
//     // and if are admin add its role
//     req.userRoleNames.push('administrator');

//     next();

// });


module.exports=route;