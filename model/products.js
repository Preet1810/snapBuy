const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Review=require('./reviews');

const ImageSchema=new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});
ImageSchema.virtual('indexImage').get(function () {
    return this.url.replace('/upload', '/upload/w_350');
});

const ProductSchema=new Schema({
    title: String,
    price: Number,
    description: String,
    categories: String,
    sellerName: String,
    location: String,
    images: [ImageSchema],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Seller'
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