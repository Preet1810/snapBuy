const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Category=require('./categories');

const ProductSchema=new Schema({
    title: String,
    price: Number,
    description: String,
    categories: String, //[
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Category'
    //     }
    // ],
    sellerName: String,
    location: String,
    image: String

})

module.exports=mongoose.model('Product', ProductSchema);