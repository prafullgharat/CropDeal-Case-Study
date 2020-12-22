const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer.model');
const farmerController = require('../controllers/farmerController');
const { verifyToken, isAdmin, isDealer, isAuthUserOrAdmin } = require('../controllers/authController');

const { upload } = require('../helper/uploadImage');


/**
 * @swagger
 * /api/farmer/all-farmers:
 *  get:
 *     summary: Gets list of all registered farmers.
 *     description: Returns JSON array containing registered farmers
 *     responses:
 *      200:
 *          description: JSON array containing registered farmers
 *      401:
 *          description: authorization error
 */
router.get('/all-farmers', verifyToken, isAdmin, farmerController.getAllFarmers);


/**
 * @swagger
 * /api/farmer/get/:email:
 *  get:
 *     summary: get  farmer details by using email id 
 *     description: Returns farmer data
 *     responses:
 *      200:
 *          description: farmer object
 *      401:
 *          description: authorization error
 *      404: 
 *          description: user does not exits
 *      
 */
router.get('/get/:email', verifyToken, farmerController.getFarmerByEmail);


/**
 * @swagger
 * /api/farmer/update/:email:
 *  put:
 *     summary: Update farmer details using email id
 *     description:  Update farmer data
 *     responses:
 *      200:
 *          description: update successful
 *      401: 
 *          description: authorization error
 *      404: 
 *          description: user does not exits
 */
router.put('/update/:email', verifyToken, isAuthUserOrAdmin, farmerController.updateFarmer);

/**
 * @swagger
 * /api/farmer/update-photo/:email:
 *  put:
 *     summary: Update farmer photo using email id
 *     description:  Update farmer photo
 *     responses:
 *      200:
 *          description: update successful
 *      401: 
 *          description: authorization error
 *      404: 
 *          description: user does not exits
 */
router.put('/update-photo/:email', verifyToken, isAuthUserOrAdmin, upload.single('image'), farmerController.updateFarmerPhoto);

/**
 * @swagger
 * /api/farmer/delete/:email:
 *  delete:
 *     summary: delete a farmer 
 *     description: to delete farmer from database
 *     responses:
 *      200:
 *          description: User deleted
 *      401: 
 *          description: authorization error
 */
router.delete('/delete/:email', verifyToken, isAdmin, farmerController.deleteFarmerByEmail);


/**
 * @swagger
 * /api/farmer/rating/:email:
 *  put:
 *     summary: give rating to farmer 
 *     description: to give rating to farmer
 *     responses:
 *      200:
 *          description: rating is given to farmer
 *      401: 
 *         description: authorization error
 *      404: 
 *         description: user does not exits
 * 
 */
router.put('/rating/:email', verifyToken, isDealer, farmerController.giveRating);

module.exports = router;
