const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // reviewModel: {
    //     type: String,
    //     // required: true,
    //     enum: ['SellerReview', 'UserReview']
    // }
    // sellerAuthor: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Seller'
    // }
},
    {
        toObject: { virtuals: true }

    });
//

reviewSchema.virtual('reviewFromUser', {
    ref: 'User',
    localField: 'author',
    foreignField: '_id',
    justOne: true
});
reviewSchema.virtual('reviewFromSeller', {
    ref: 'Seller',
    localField: 'author',
    foreignField: '_id',
    justOne: true
});


module.exports=mongoose.model("Review", reviewSchema);