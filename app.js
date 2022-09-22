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
app.use(express.static(path.join(__dirname, 'public')))  //setting up public directory

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

app.use((req, res, next) => {
    res.locals.success=req.flash('success');
    next();
})



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