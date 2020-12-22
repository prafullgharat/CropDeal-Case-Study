const Farmer = require('../models/Farmer.model');
const User = require('../models/User.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = "secret key";


// controller actions

//get all farmers
module.exports.getAllFarmers = function (req, res, next) {
  Farmer.find({}).then(function (farmers) {
    res.status(200).send(farmers);
  }).catch(next);
}

//get farmer by email id
module.exports.getFarmerByEmail = function (req, res, next) {
  email = req.params.email;
  Farmer.findOne({ email: email }).then(function (farmer) {
    if(farmer){
      res.status(200).send(farmer);
    }
    else{
      res.status(404).json({ error: "User does not exits with given email id" });
    }
  }).catch(next);
}


module.exports.postFarmer = function (req, res, next) {
  Farmer.create(req.body).then(function (farmer) {
    res.send(farmer);
  }).catch(next);
}

//update farmer by using email id
module.exports.updateFarmer = function (req, res, next) {
  // console.log(req.body);
  Farmer.findOneAndUpdate({ email: req.params.email }, req.body)
    .then(function () {
      Farmer.findOne({ email: req.params.email }).then(function (farmer) {
        if(farmer){
          res.status(200).send(farmer);
        }
        else{
          res.status(404).json({ error: "User does not exits with given email id" });
        }
      });
    })
    .catch(next);
}

//update farmer photo by using email id
module.exports.updateFarmerPhoto = function (req, res, next) {
  console.log(req.body);
  Farmer.findOneAndUpdate({ email: req.params.email }, { photo: req.file.path })
    .then(function () {
      Farmer.findOne({ email: req.params.email }).then(function (farmer) {
        res.status(200).send(farmer);
      });
    })
    .catch(next);
}

//delete farmer by using email id
module.exports.deleteFarmerByEmail = function (req, res, next) {
  User.deleteOne({ email: req.params.email })
    .then(function (user) {
      // console.log("user deleted")
      Farmer.deleteOne({ email: req.params.email })
        .then(function (farmer) {
          // console.log("farmer deleted");
          res.status(200).send({ message: "Farmer Deleted" });
        })
        .catch(next);
    })
    .catch(next);
}


//give rating to farmer 
module.exports.giveRating = function (req, res, next) {
  console.log(req.body);

  Farmer.findOne({email:req.params.email})
    .then(function(farmer){
          farmer.rating.push(req.body);

          newRating = req.body.rate;
          farmer.avgRating = (farmer.avgRating * farmer.numberOfRatings + newRating) / (farmer.numberOfRatings + 1);
          farmer.numberOfRatings = farmer.numberOfRatings + 1;
          farmer.save().then(res.status(200).send(farmer));
          
        }
    )
    .catch(next);
}

