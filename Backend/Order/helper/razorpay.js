let Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: 'rzp_test_GDor6jmgScyMhs',
    key_secret: 'oCuHzgJCoKEha6V70SPzDWEW'
});

let RazorpayConfig={
    key_id: 'rzp_test_GDor6jmgScyMhs',
    key_secret: 'oCuHzgJCoKEha6V70SPzDWEW'
}
module.exports.config = RazorpayConfig;
module.exports.instance = instance;
//   var options = {
//     amount: 50000,  // amount in the smallest currency unit
//     currency: "INR",
//     receipt: "order_rcptid_11",
//     payment_capture: '0'
//   };
//   instance.orders.create(options, function(err, order) {
//     console.log(order);
//   });