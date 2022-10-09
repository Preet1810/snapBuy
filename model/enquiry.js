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
        ref: 'User'
    }
});

module.exports=mongoose.model('Enquiry', enquirySchema);

