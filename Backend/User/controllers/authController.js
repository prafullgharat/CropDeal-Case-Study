const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer.model');
const Dealer = require('../models/Dealer.model');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

// handle errors
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: '', password: '', name: ''};

  // empty email
  if (err.message === 'Email is required') {
    errors.email = 'Email is required';
  }

  // empty password
  if (err.message === 'Password is required') {
    errors.password = 'Password is required';
  }

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'Email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'Password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'The email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


module.exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({error:'Unauthorized request'})
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).json({error:'Token Missing'})
  }
  let payload = jwt.verify(token, secretKey)
  if (!payload) {
    return res.status(401).json({error:'Invalid Token'})
  }
  req.userId = payload.id;
  req.email = payload.email;
  // req.body.email = payload.email;

  req.userType = payload.userType;

  next();
}

module.exports.isAdmin = (req, res, next) => {
  if (req.userType !== "admin") {
    return res.status(401).json({error:'Admin Privilege needed'});
  }
  next();
}

module.exports.isDealer = (req, res, next) => {
  if (req.userType !== "dealer") {
    return res.status(401).json({error:'Dealer Privilege needed'});
  }
  next();
}

module.exports.isFarmer = (req, res, next) => {
  if (req.userType !== "farmer") {
    return res.status(401).json({error:'Farmer Privilege needed'});
  }
  next();
}

module.exports.isAuthUserOrAdmin = (req, res, next) => {
  if (req.userType == "admin" || req.params.email == req.email) {
    next();
  }
  else {
    return res.status(401).json({error:'You are not authorized'});
  }
}



module.exports.signup = async (req, res) => {
  try {
    //encrypting password
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);

    //create user with email and password
    const user = await User.create(req.body);
    // console.log(user);
    let payload = { id: user._id, email: user.email, userType: user.userType }
    let token = jwt.sign(payload, secretKey);
    let userType = user.userType;
    let userEmail = user.email;
    res.status(200).send({ token, userType, userEmail })
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.register = async (req, res) => {
  try {
    req.body.email = req.email;
    console.log(req.body);
    var user = null;
    if (req.body.userType == "farmer") {
      user = await Farmer.create(req.body);
    }
    else if (req.body.userType == "dealer") {
      user = await Dealer.create(req.body);
    }
    // const user = await Farmer.create(req.body);
    await User.findOneAndUpdate({ email: user.email }, { userType: user.userType })

    let payload = { id: user._id, email: user.email, userType: user.userType }
    let token = jwt.sign(payload, secretKey);
    let userType = user.userType;
    let userEmail = user.email;
    res.status(200).send({ token, userType, userEmail });

  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}


module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    let payload = { id: user._id, email: user.email, userType: user.userType }
    let token = jwt.sign(payload, secretKey);
    let userType = user.userType;
    let userEmail = user.email;
    res.status(200).send({ token, userType, userEmail });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}