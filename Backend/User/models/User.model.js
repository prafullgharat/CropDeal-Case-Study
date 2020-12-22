const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

// create user Schema & model

const UserSchema = new Schema({
    
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique:  [true, 'You already have a account'],
        // lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        // required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters'],
      },
    userType: {
        type: String,
        default: "null"
    },
    googleId:{
        type: String,
    }  
    
});



// static method to login farmer
UserSchema.statics.login = async function(email, password) {
    if(!email){
        throw Error('Email is required');
    }
    else if(!password){
        throw Error('Password is required');
    }
    else{
        const user = await this.findOne({ email });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw Error('incorrect password');
        }
        throw Error('incorrect email');
    }
  };

const User = mongoose.model('user', UserSchema);

module.exports = User;
