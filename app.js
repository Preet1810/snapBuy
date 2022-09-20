const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');    //for the boilerplate
const Joi=require('joi'); //for server side validation
const { productSchema }=require('./schemas.js');
const catchAsync=require('./utils/catchAsync')
const ExpressError=require('./utils/ExpressErrors');
const methodOverride=require('method-override');
const Product=require('./model/products')



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


const validateCampground=(req, res, next) => {
    const { error }=productSchema.validate(req.body);
    if (error) {
        const msg=error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/products', catchAsync(async (req, res) => {
    const products=await Product.find({})                           //all products
    res.render('products/index', { products });
}))
app.get('/products/new', catchAsync(async (req, res) => {                          //new product page
    res.render('products/new');
}))

app.get('/products/categories/:id', catchAsync(async (req, res) => {
    const { id }=req.params;
    const catPage=await Product.find({ categories: `${id}` })
    res.render('products/category', { catPage });
}))

app.post('/products', validateCampground, catchAsync(async (req, res, next) => {
    const product=new Product(req.body.product);
    await product.save();                                       //CREATING NEW PRODUCT
    res.redirect(`/products/${product._id}`)

}))

app.get('/products/:id', catchAsync(async (req, res) => {
    const product=await Product.findById(req.params.id)       //show page
    res.render('products/show', { product });
}))

app.get('/products/:id/edit', catchAsync(async (req, res) => {
    const product=await Product.findById(req.params.id)      //edit form
    res.render('products/edit', { product });
}))

app.put('/products/:id', validateCampground, catchAsync(async (req, res) => {
    const { id }=req.params;
    const product=await Product.findByIdAndUpdate(id, { ...req.body.product });   //editing
    res.redirect(`/products/${product._id}`)
}));

app.delete('/products/:id', async (req, res) => {
    const { id }=req.params;
    await Product.findByIdAndDelete(id);        //delete
    res.redirect('/products');
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