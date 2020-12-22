const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    dealerEmail: {
        type: String,
    },
    rate: {
        type:Number,
    }
});


const FarmerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique:  [true, 'You already have a account'],
        // lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required']

    },
    address:{
        type:String
    },
    bankDetails:{
        bank_name: {
            type: String,
            default:''
            
        },
        account_no: {
            type: String,
            default:''

        },
        ifsc: {
            type: String,
            default:''

        }
    },
    userType: {
        type: String,
        
    },
    photo : {
        type: String,
        default: "uploads/profile/default.jpg"

    },
    rating:[RatingSchema],

    avgRating:{
        type:Number,
        default:0
    },
    numberOfRatings:{
        type:Number,
        default:0

    }  
    
});


// fire a function to encrypt password before saving a new user to db
// FarmerSchema.pre('save', async function(next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// static method to login farmer
FarmerSchema.statics.login = async function(email, password) {
    if(!email){
        throw Error('Email is required');
    }
    else if(!password){
        throw Error('Password is required');
    }
    else{
        const farmer = await this.findOne({ email });
        if (farmer) {
            const auth = await bcrypt.compare(password, farmer.password);
            if (auth) {
                return farmer;
            }
            throw Error('incorrect password');
        }
        throw Error('incorrect email');
    }
  };

const Farmer = mongoose.model('farmer', FarmerSchema);

module.exports = Farmer;
