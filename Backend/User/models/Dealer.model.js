const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;


const DealerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique:  [true, 'You have already have a account'],
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
        default: 'dealer'
    },
    detail: {
        type: String,
        
    },
    subscribed_crops : {
            type: [String],
            default: [],
    },
    photo : {
        type: String,
        default: "uploads/profile/default.jpg"

    } 
    
});

// fire a function to encrypt password before saving a new user to db
// DealerSchema.pre('save', async function(next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// static method to login farmer
DealerSchema.statics.login = async function(email, password) {
    if(!email){
        throw Error('Email is required');
    }
    else if(!password){
        throw Error('Password is required');
    }
    else{
        const dealer = await this.findOne({ email });
        if (dealer) {
            const auth = await bcrypt.compare(password, dealer.password);
            if (auth) {
                return dealer;
            }
            throw Error('incorrect password');
        }
        throw Error('incorrect email');
    }
  };


const Dealer = mongoose.model('dealer', DealerSchema);

module.exports = Dealer;
