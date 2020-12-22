const express = require('express');
const router = express.Router();
const { verifyToken, login, signup, register } = require('../controllers/authController');


// to check login credentials and send token
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *     summary: login a user
 *     description: check if user is valid, if valid then check password. If password is correct, send token
 *     responses:
 *      200:
 *          description: returns token, userType, userEmail 
 *      401: 
 *          description: errors
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *     summary: sign up new  user and send token
 *     description: sign up new  user and send token
 *     responses:
 *      200:
 *          description: returns token, userType, userEmail 
 *      400: 
 *          description: registration failed
 *     
 */
router.post('/signup', signup);


/**
 * @swagger
 * /api/auth/register:
 *  post:
 *     summary: to register a new user and send token
 *     description:  register a new user and send token
 *     responses:
 *      200:
 *          description: returns token, userType, userEmail 
 *      400: 
 *          description: registration failed
 *     
 */
router.post('/register', verifyToken, register);




module.exports = router;
