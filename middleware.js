module.exports.isLoggedIn=(req, res, next) => {
    if (!req.isAuthenticated()) {
        // console.log(req.path, req.originalUrl)
        req.session.returnTo=req.originalUrl
        req.flash('error', 'You Must Be Signed In');
        return res.redirect('/login')
    }
    next()
}