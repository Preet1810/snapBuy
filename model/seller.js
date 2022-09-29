const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');

const SellerSchema=new Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    CompanyName: {
        type: String,
        required: true
    },
    CompanyAddress: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    }

});

SellerSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('Seller', SellerSchema);

