const mongoose=require('mongoose');
const cities=require('./cities');
const { places, descriptors, categories }=require('./seedHelper');
const Product=require('../model/products');
// const Category=require('../model/categories');

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
        const price=Math.floor(Math.random()*30)
        const prudu=new Product({
            author: '63355666d4c25e7696191ba2',
            location: `${cities[random1000].name}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png',
            description: 'Voluptate placeat corporis et voluptatem qui id eveniet perspiciatis exercitationem, natus quibusdam dolorem dignissimos eaque provident. Quis a totam earum architecto dignissimos. Cupiditate ipsa officia maxime quaerat saepe autem modi!Maiores aut aperiam eos !',
            price,
            sellerName: `${sample(descriptors)}`,
            categories: `${sample(categories)}`,

        })
        // const categ=new Category({
        //     name: `${sample(descriptors)}`
        // })
        // prudu.categories.push(categ);
        // await categ.save();
        await prudu.save();

    }
}

seedDB().then(() => {
    mongoose.connection.close();
})