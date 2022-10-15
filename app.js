if (process.env.NODE_ENV!=="production") {
    require('dotenv').config();
}
// console.log(process.env.idk)


const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');    //for the boilerplate
const session=require('express-session'); //
const flash=require('connect-flash');
const ExpressError=require('./utils/ExpressErrors');
const methodOverride=require('method-override');

const products=require('./routes/product');
const categories=require('./routes/categories');
const reviews=require('./routes/reviews');
const userRoutes=require('./routes/users');
const sellerRoutes=require('./routes/seller');
const dashboardRoutes=require('./routes/sellerDashboard')
const enquiryRoutes=require('./routes/enquiry')

const passport=require('passport');
const LocalStrategy=require('passport-local');

const User=require('./model/user');
const Seller=require('./model/seller');

// const { find, moreFind }=require('./middleware');




mongoose.connect('mongodb://localhost:27017/snapbuy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db=mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const app=express();

app.engine('ejs', ejsMate)  //boilerplate
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))  //setting up views directory


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
//setting up public directory
app.use(express.static(__dirname+'/public'));

const sessionConfig={
    secret: 'Asecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now()+1000*60*60*24*7,     //will be expired in 7 days
        maxAge: 1000*60*60*24*7
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate(), Seller.authenticate()));

// passport.use(new LocalStrategy(Seller.authenticate()));

passport.use('userLocal', new LocalStrategy(User.authenticate()));
passport.use('sellerLocal', new LocalStrategy(Seller.authenticate()));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    if (user!=null)
        done(null, user);
});

// passport.serializeUser(Seller.serializeUser(), User.serializeUser());
// passport.deserializeUser(Seller.deserializeUser(), User.deserializeUser());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// const idk=async (req, res, next) => {
//     if (User.authenticate()) {
//         res.locals.currentBuyer=req.user;
//     }
//     // res.locals.currentSeller=req.user;
//     console.log(res.locals.currentBuyer);
//     next();
// }


app.use((req, res, next) => {                             //these are globals, i have access to them in everysingle template
    res.locals.currentUser=req.user
    // console.log(res.locals.currentUser); 
    // res.locals.reviewAuthor=author;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})
app.use('/enquiry', enquiryRoutes);
app.use('/', dashboardRoutes);
app.use('/', sellerRoutes);
app.use('/', userRoutes);
app.use('/products', products);
app.use('/products/categories', categories);
app.use('/products/:id/reviews', reviews)



app.get('/', (req, res) => {
    res.render('home')
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode=500 }=err;
    if (!err.message) err.message='Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


app.listen(3000, () => {
    console.log('serving on port number 3000')
})