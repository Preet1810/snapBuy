const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const enquirySchema=new Schema({
    productname: String,
    quantity: Number,
    unit: String,
    buyingBody: String,
    email: String,
    contact: Number,
    seller: String,
    author: {
        type: Schema.Types.ObjectId,
        // ref: 'User'
    }
},
    {
        toObject: { virtuals: true }

    });

enquirySchema.virtual('enquiryFromUser', {
    ref: 'User',
    localField: 'author',
    foreignField: '_id',
    justOne: true
});
enquirySchema.virtual('enquiryFromSeller', {
    ref: 'Seller',
    localField: 'author',
    foreignField: '_id',
    justOne: true
});

module.exports=mongoose.model('Enquiry', enquirySchema);

