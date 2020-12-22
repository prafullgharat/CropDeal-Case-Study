const express = require('express');
const router = express.Router();

const cropController = require('../controllers/cropController');
// const { verifyToken, isAdmin, isFarmer, isAuthUserOrAdmin } = require('../controllers/authController');
const { verifyToken, isFarmer } = require('../controllers/authController');
const { upload } = require('../helper/uploadImage');


// get a list of crops from the db


/**
 * @swagger
 * /api/crops:
 *  get:
 *     summary: Get a list of all crops from the db
 *     description: Returns JSON array containing all published crops
 *     responses:
 *      200:
 *          description: all published crops   
 */
router.get('/crops', cropController.getAllCrops);

/**
 * @swagger
 * /api/crop/:id:
 *  get:
 *     summary:  get a crop by id from the db
 *     description: Returns a json object containing crop's details whose id is passed in url
 *     responses:
 *      200:
 *          description: json object  
 *      401:
 *          description: authorization error
 */
router.get('/crop/:id', verifyToken, cropController.getCropById);

/**
 * @swagger
 * /api/crop/farmer/:email:
 *  get:
 *     summary: Get a list of crops by using farmer emailid 
 *     description: Returns JSON array containing all crops published by a farmer whose id is passed in url
 *     responses:
 *      200:
 *          description: crops published by a farmer   
 * 
 */
router.get('/crop/farmer/:email', verifyToken, cropController.getCropsByFarmerEmail);


/**
 * @swagger
 * /api/crop/dealer:
 *  post:
 *     summary: get subscribed crops by dealer from the db
 *     description: Returns all crops subscribed by a dealer. 
 *     responses:
 *      200:
 *          description: crops subscribed by a dealer   
 */
router.post('/crop/dealer', cropController.getSubscribedCrop);

/**
 * @swagger
 * /api/filtered-crops:
 *  post:
 *     summary:  get filtered crops from the db
 *     description: category array is passed as a argument, crops of types mentioned in the category array are returned
 *     responses:
 *      200:
 *          description: filtered crops 
 */
router.post('/filtered-crops', cropController.getFilteredCrops);


/**
 * @swagger
 * /api/crop:
 *  post:
 *     summary:  Add a new crop to the db
 *     description: add a new crop to the db
 *     responses:
 *      200:
 *          description: crop object
 *      422:
 *          description: image required error
 *      400:
 *          description: input fields required error
 *      401:
 *          description: authorization error
 */
router.post('/crop',verifyToken, isFarmer, upload.single('image'), cropController.postCrop);


/**
 * @swagger
 * /api/crop:id:
 *  put:
 *     summary: Update a crop in the db
 *     description: Update a existing crop's details.
 *     responses:
 *      200:
 *          description: crop object
 *      401:
 *          description: authorization error
 */
router.put('/crop/:id', verifyToken, isFarmer, cropController.updateCropById);

/**
 * @swagger
 * /api/crop:id:
 *  delete:
 *     summary: delete a crop from the db
 *     description: Delete an existing crop's details.
 *     responses:
 *      200:
 *          description: crop object
 *      401:
 *          description: authorization error
 */
router.delete('/crop/:id', verifyToken, isFarmer, cropController.deleteCropById);

module.exports = router;
