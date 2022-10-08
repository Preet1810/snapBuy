const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');

const SellerSchema=new Schema({
    proprietorname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    companyname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactnumber: {
        type: Number,
        required: true
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    enquiries: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Enquiry',
        }
    ],
    image: String,
    aboutcompany: String,
    nature: String
});

SellerSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('Seller', SellerSchema);

