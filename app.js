const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))  //setting up views directory

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/createproduct', async (req, res) => {
    const produ=new Product({ title: "First", description: "lololo" });
    await produ.save()
    res.send(produ)
})

app.listen(3000, () => {
    console.log('serving on port number 3000')
})