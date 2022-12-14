const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');
// const reviewS=require('./reviews')


const UserSchema=new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: Number,
    },
    isSeller: {
        type: Boolean,
        default: false
    }
});


UserSchema.plugin(passportLocalMongoose); //this will add a username, a field for password, also check for duplicates

module.exports=mongoose.model('User', UserSchema);

