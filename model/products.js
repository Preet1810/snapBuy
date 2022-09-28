const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Review=require('./reviews');

const ProductSchema=new Schema({
    title: String,
    price: Number,
    description: String,
    categories: String,
    sellerName: String,
    location: String,
    image: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

ProductSchema.post('findOneAndDelete', async function (doc) {


    if (doc) {
        await Review.deleteMany({
            _id: {                                                     //mongoose middleware
                $in: doc.reviews
            }                                                          //deleting all reviews once the product is deleted
        })
    }
})

module.exports=mongoose.model('Product', ProductSchema);