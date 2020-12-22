const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Order Schema & model
const OrderSchema = new Schema({
    paymentId:{
        type: String,
        required: [true, 'Payment Id is required']

        
    },
    farmerEmail:{
        type: String,
        required: [true, 'Farmer Email is required']
    },
    dealerEmail:{
        type: String,
        required: [true, 'Dealer Email is required']
    },
    farmerName:{
        type: String,
        required: [true, 'Farmer Name is required']
    },
    dealerName:{
        type: String,
        required: [true, 'Dealer Name is required']
    },
    category: {
        type: String,
        required: [true, 'Category field is required']
    },
    cropName: {
        type: String,
        required: [true, 'Name of crop is required'],
    },
    quantity: {
        type: String,
        required: [true, 'Quantity field is required']

    },
    pricePerKg:{
        type:Number,
        required: [true, 'Price per kg field is required']
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total Amount field is required']
    },
    dateOfPurchase:{
        type: Date,
        default: Date.now
    }
    
    
});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
