const mongoose=require('mongoose');
const cities=require('./cities');
const { places, descriptors }=require('./seedHelper');
const Product=require('../model/products');

mongoose.connect('mongodb://localhost:27017/snapbuy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db=mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample=array => array[Math.floor(Math.random()*array.length)];


const seedDB=async () => {
    await Product.deleteMany({});
    for (let i=0; i<50; i++) {
        const random1000=Math.floor(Math.random()*199);
        const prudu=new Product({
            location: `${cities[random1000].name}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await prudu.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})