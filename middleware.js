const Product=require('./model/products');
const Review=require('./model/reviews');
const ExpressError=require('./utils/ExpressErrors');
const { productSchema, reviewSchema, enquirySchema }=require('./schemas.js');



module.exports.validateReview=(req, res, next) => {
    const { error }=reviewSchema.validate(req.body);
    if (error) {
        const msg=error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateProduct=(req, res, next) => {
    const { error }=productSchema.validate(req.body);
    if (error) {
        const msg=error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateEnquiry=(req, res, next) => {
    const { error }=enquirySchema.validate(req.body);
    if (error) {
        const msg=error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isLoggedIn=(req, res, next) => {
    if (!req.isAuthenticated()) {
        if (req.originalUrl.includes('reviews')) {
            const newUrl=req.originalUrl.slice(0, -8);
            req.session.returnTo=newUrl
        } else {
            req.session.returnTo=req.originalUrl
            req.flash('error', 'You Must Be Signed In');
        }
        return res.redirect('/login/seller')
    }
    next()
}

module.exports.isAuthor=async (req, res, next) => {
    const { id }=req.params;
    const product=await Product.findById(id);
    if (!product.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/products/${id}`);
    }
    next();
}


module.exports.isReviewAuthor=async (req, res, next) => {
    const { id, reviewid }=req.params;
    const review=await Review.findById(reviewid);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/products/${id}`);
    }
    next();
}

module.exports.isSeller=async (req, res, next) => {
    if (!req.user.isSeller) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect('/products')
    }
    next();
}
module.exports.isUser=async (req, res, next) => {
    if (req.user.isSeller) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect('/products')
    }
    next();
}


// module.exports.find=async (req, res, next) => {
//     if (req.isAuthenticated()) {
//         if (req.user.isBuyer) {
//             res.locals.currentBuyer=req.user
//             // res.locals.currentSeller=undefined
//         }
//         else if (req.user.isSeller) {
//             // let currentBuyer=req.user
//             // res.locals.currentBuyer=req.user
//             res.locals.currentSeller=req.user
//         }
//     }
//     next();
// }

// module.exports.moreFind=async (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         res.locals.currentBuyer=req.user
//         res.locals.currentSeller=req.user
//     }
//     next();
// }

