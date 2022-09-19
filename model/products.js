const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ProductSchema=new Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    sellerName: String,
    location: String,
    image: String

})

module.exports=mongoose.model('Product', ProductSchema);