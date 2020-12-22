const Order = require('../models/Order.model');
const emailService = require('../helper/emailSetup.js')
// controller actions


module.exports.getAllOrders= function(req, res, next){
    Order.find({}).then(function(orders){
        res.status(200).send(orders);
    }).catch(next);
}

module.exports.getOrderById = function(req, res, next){
    id = req.params.id;
    Order.findById(id).then(function(order){
        res.status(200).send(order);
    }).catch(next);
}

module.exports.getOrderByFarmerEmail = function(req, res, next){
    email = req.params.email;
    Order.find({farmerEmail:email}).then(function(orders){
        res.status(200).send(orders);
    }).catch(next);
}

module.exports.getOrderByDealerEmail = function(req, res, next){
    email = req.params.email;
    Order.find({dealerEmail:email}).then(function(orders){
        res.status(200).send(orders);
    }).catch(next);
}


module.exports.postOrder = function(req, res, next){
    Order.create(req.body).then(function(order){
        const mailOptions = {
            from:'cropdeal100@gmail.com',
            to:`${req.body.farmerEmail}, ${req.body.dealerEmail}`,
            subject:'Payment Receipt from CropDeal.',
            html:`
                <div>
                    <div>
                        <span>Dealer Name:</span>
                        <strong>
                            ${req.body.dealerName}
                        </strong>
                        <p>
                            <span>
                            Dealer Email:
                            ${req.body.dealerEmail}
                            </span>
                        </p>
                    </div>
                    <div>
                        <span>Farmer Name:</span>
                        <strong>
                            ${req.body.farmerName}
                        </strong>
                        <p>
                            <span>
                            Farmer Email:
                             ${req.body.farmerEmail}
                            </span>
                        </p>
                    </div>
                </div>

                <div>
						<table style="{border:1px solid}">
                            <tr>
                                <td>Payment Id</td>
                                <td>Crop Name</td>
                                <td>Quantity</td>
                                <td>Cost Per Kg</td>
								<td>Amount</td>
							</tr>
                        
						    <tr>
                                <td>
                                ${req.body.paymentId}
                                </td>
								<td>
                                ${req.body.cropName}
								</td>
								<td >
                                ${req.body.quantity}
                                </td>
                                <td >
                                ${req.body.pricePerKg}
								</td>
								<td>
                                ${req.body.totalAmount}
								</td>
							</tr>
							
                        </table>
                    </div>
            
            `
            
        };
        emailService.sendMail(mailOptions);
        res.status(200).send(order);
    }).catch(next);
}

module.exports.updateOrderById = function(req, res, next){
    Order.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function(){
        Order.findOne({_id: req.params.id}).then(function(order){
            res.status(200).send(order);
        });
    })
    .catch(next);
}

module.exports.deleteOrderById = function(req, res, next){
    Order.findByIdAndRemove({_id: req.params.id})
    .then(function(order){
        res.status(200).send(order);
    })
    .catch(next);
}
