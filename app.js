const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');    //for the boilerplate
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

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/products', async (req, res) => {
    const products=await Product.find({})                           //all products
    res.render('products/index', { products });
})
app.get('/products/new', async (req, res) => {                          //new product page
    res.render('products/new');
})

app.post('/products', async (req, res) => {
    const products=new Product(req.body.product);
    await products.save();                                       //CREATING NEW PRODUCT
    res.redirect(`/products/${products._id}`)
})

app.get('/products/:id', async (req, res) => {
    const products=await Product.findById(req.params.id)       //show page
    res.render('products/show', { products });
})

app.get('/products/:id/edit', async (req, res) => {
    const products=await Product.findById(req.params.id)      //edit form
    res.render('products/edit', { products });
})

app.put('/products/:id', async (req, res) => {
    const { id }=req.params;
    const products=await Product.findByIdAndUpdate(id, { ...req.body.products });   //editing
    res.redirect(`/products/${products._id}`)
});

app.delete('/products/:id', async (req, res) => {
    const { id }=req.params;
    await Product.findByIdAndDelete(id);        //delete
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('serving on port number 3000')
})