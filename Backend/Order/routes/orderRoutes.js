const express = require('express');
const router = express.Router();
const Crop = require('../models/Order.model');

const orderController = require('../controllers/orderController');
const { verifyToken } = require('../controllers/authController');



/**
 * @swagger
 * /api/order:
 *  get:
 *     summary: get a list of all payment details from the db.
 *     description: Returns payment details from database.
 *     responses:
 *      200:
 *          description: payment details
 *      401:
 *          description: authorization error
 */
router.get('/order', orderController.getAllOrders);


/**
 * @swagger
 * /api/order/farmer/:email:
 *  get:
 *     summary:  get a list of payments from the db according farmer email
 *     description: Returns payment details from database for given farmer.
 *     responses:
 *      200:
 *          description: payment details
 *      401:
 *          description: authorization error
 */
router.get('/order/farmer/:email', verifyToken, orderController.getOrderByFarmerEmail);


/**
 * @swagger
 * /api/order/dealer/:email:
 *  get:
 *     summary:  get a list of payments from the db according dealer email
 *     description: Returns payment details from database for given dealer.
 *     responses:
 *      200:
 *          description: payment details
 *      401:
 *          description: authorization error
 */
router.get('/order/dealer/:email', verifyToken, orderController.getOrderByDealerEmail);


/**
 * @swagger
 * /api/order/:id:
 *  get:
 *     summary:  get a order by id from the db
 *     description: Returns payment details from database whose id matches to the id sent in url.
 *     responses:
 *      200:
 *          description: order object
 *      401:
 *          description: authorization error
 */
router.get('/order/:id', verifyToken, orderController.getOrderById);


/**
 * @swagger
 * /api/order:
 *  post:
 *     summary:   add a new order to the db
 *     description:  add a new order to the db and send receipt to the farmer and dealer using emails.
 *     responses:
 *      200:
 *          description: order object
 *      401:
 *          description: authorization error
 */
router.post('/order', verifyToken, orderController.postOrder);


// update a order in the db
/**
 * @swagger
 * /api/order/:id:
 *  put:
 *     summary:   update order in the db
 *     description:  update order details
 *     responses:
 *      200:
 *          description: order object
 *      401:
 *          description: authorization error
 */
router.put('/order/:id', verifyToken, orderController.updateOrderById);

/**
 * @swagger
 * /api/order/:id:
 *  delete:
 *     summary:   delete order in the db
 *     description:  delete order details
 *     responses:
 *      200:
 *          description: order object
 *      401:
 *          description: authorization error
 */
router.delete('/order/:id', verifyToken, orderController.deleteOrderById);


module.exports = router;
