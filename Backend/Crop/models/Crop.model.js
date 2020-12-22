const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Crop Schema & model
const CropSchema = new Schema({
    category: {
        type: String,
        required: [true, 'Category field is required']
    },
    name: {
        type: String,
        required: [true, 'Please enter name of crop.']
    },
    quantity: {
        type: String,
        required: [true, 'Quantity field is required']
    },
    address: {
        type: String,
        required: [true, 'Address field is required']
    },
    description: {
        type: String,
        required: [true, 'Description field is required']
    },
    farmerEmail: {
        type: String,
        required: [true, 'Farmer Email field is required']
    },
    dateOfPublish: {
        type: Date,
        default: Date.now
    },
    cropImage: {
        type: String,
        required: [true, 'Farmer Email field is required']
    }


});

const Crop = mongoose.model('crop', CropSchema);

module.exports = Crop;
