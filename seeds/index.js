const mongoose=require('mongoose');
const cities=require('./cities');
const { places, descriptors, categories, seedImages }=require('./seedHelper');
const Product=require('../model/products');
// const Category=require('../model/categories');
if (process.env.NODE_ENV!=="production") {
    require('dotenv').config();
}
const dbUrl=process.env.DB_URL;
mongoose.connect(dbUrl, {
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
        const price=Math.floor(Math.random()*30+500)
        const prudu=new Product({
            // 63518b649da5d8d2a3e4e82b - local
            // 63521cd2deeb3ecdde66ce46 - main
            author: '63521cd2deeb3ecdde66ce46',
            location: `${cities[random1000].name}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: `${sample(seedImages)}`
                },

            ],
            description: 'Greetings from SnapBuy, I Created this App to show my skill in web development. If you enjoyed it and would like to work with me, please get in touch with me at preetpalsingh1239@gmail.com. This application serves only to publicise my work. The information on it is completely bogus.',
            price,
            sellerName: `${sample(descriptors)}`,
            categories: `${sample(categories)}`,
            contactNumber: '23423424322'

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