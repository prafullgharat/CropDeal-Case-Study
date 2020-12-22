const express = require('express');
const router = express.Router();
// const Dealer = require('../models/Dealer.model');
const dealerController = require('../controllers/dealerController');
const { verifyToken, isAdmin, isDealer, isAuthUserOrAdmin } = require('../controllers/authController');

const { upload } = require('../helper/uploadImage');




/**
 * @swagger
 * /api/dealer/all-dealers:
 *  get:
 *     summary: Gets list of all registered dealers.
 *     description: Returns JSON array containing registered dealers
 *     responses:
 *      200:
 *          description: JSON array containing registered dealers
 *      401:
 *          description: authorization error
 */
router.get('/all-dealers', verifyToken, isAdmin, dealerController.getAllDealers);

/**
 * @swagger
 * /api/dealer/get/:email:
 *  get:
 *     summary: get dealer details by using email id 
 *     description: Returns dealer data
 *     responses:
 *      200:
 *          description: dealer object
 *      401:
 *          description: authorization error
 *      404: 
 *          description: user does not exits
 */
router.get('/get/:email', verifyToken, isAuthUserOrAdmin, dealerController.getDealerByEmail);


/**
 * @swagger
 * /api/dealer/update/:email:
 *  put:
 *     summary: Update dealer details using email id
 *     description:  Update dealer data
 *     responses:
 *      200:
 *          description: dealer object
 *      401: 
 *          description: authorization error
 */
router.put('/update/:email', verifyToken, isAuthUserOrAdmin, dealerController.updateDealer);


/**
 * @swagger
 * /api/dealer/update-photo/:email:
 *  put:
 *     summary: Update dealer photo using email id
 *     description:  Update dealer's photo
 *     responses:
 *      200:
 *          description: dealer object
 *      401: 
 *          description: authorization error
 *      
 */
router.put('/update-photo/:email', verifyToken, isAuthUserOrAdmin, upload.single('image'), dealerController.updateDealerPhoto);

/**
 * @swagger
 * /api/dealer/delete/:email:
 *  delete:
 *     summary: delete a dealer 
 *     description: to delete dealer from database
 *     responses:
 *      200:
 *          description: User deleted
 *      401: 
 *          description: authorization error
 * 
 */
router.delete('/delete/:email', verifyToken, isAdmin, dealerController.deleteDealerByEmail);


/**
 * @swagger
 * /api/dealer/subscribe:
 *  put:
 *     summary: subscribe to crop
 *     description: dealer will subscribe to crop 
 *     responses:
 *      200:
 *          description: dealers subscribed crops
 *      422:
 *          description: already subscribed to crop
 *      401: 
 *          description: authorization error
 * 
 */
router.put('/subscribe/', verifyToken, dealerController.subscribeToCrop);


/**
 * @swagger
 * /api/dealer/unsubscribe:
 *  put:
 *     summary: unsubscribe to crop
 *     description: dealer will unsubscribe to crop 
 *     responses:
 *      200:
 *          description: dealer's subscribed crops
 *      401: 
 *          description: authorization error
 * 
 */
router.put('/unsubscribe/', verifyToken, dealerController.unSubscribeCrop);


/**
 * @swagger
 * /api/dealer/subscription:
 *  get:
 *     summary: get names of crops subcribed by dealer
 *     description: names of crops subcribed by dealer
 *     responses:
 *      200:
 *          description: dealer's subscribed crops names
 *      401: 
 *          description: authorization error
 * 
 */
router.get('/subscription/', verifyToken, dealerController.getSubscription);

/**
 * @swagger
 * /api/dealer/subscribed-crops:
 *  post:
 *     summary: get published crops which are subscribed by dealer
 *     description:  get published crops which are subscribed by dealer
 *     responses:
 *      200:
 *          description: subscribed crops list
 *      401: 
 *          description: authorization error
 * 
 */
router.post('/subscribed-crops', verifyToken, dealerController.getSubscribedCrops);



module.exports = router;
