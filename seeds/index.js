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
            author: '63518b649da5d8d2a3e4e82b',
            location: `${cities[random1000].name}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dwh4llt0c/image/upload/v1665741720/SnapBuy/febo7lnxtl3i0dvhzovr.jpg',
                    filename: 'SnapBuy/febo7lnxtl3i0dvhzovr',
                },
                {
                    url: 'https://res.cloudinary.com/dwh4llt0c/image/upload/v1665741724/SnapBuy/re1zcb3wzx76boahdhmr.jpg',
                    filename: 'SnapBuy/re1zcb3wzx76boahdhmr',
                }
            ],
            description: 'Voluptate placeat corporis et voluptatem qui id eveniet perspiciatis exercitationem, natus quibusdam dolorem dignissimos eaque provident. Quis a totam earum architecto dignissimos. Cupiditate ipsa officia maxime quaerat saepe autem modi!Maiores aut aperiam eos !',
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