const Crop = require('../models/Crop.model');
const jwt = require('jsonwebtoken');

const secretKey = "secret key";
axios = require('axios');


// handle errors
const handleErrors = (err) => {
    // console.log(err.message, err.code);
    let errors = { name: '', category: '', address: '',description: '', quantity: '', cropImage: '', farmerEmail: ''};
  
    // // empty email
    // if (err.message === 'Name is required') {
    //   errors.name = 'Name is required';
    // }
  
    // // empty password
    // if (err.message === 'Category is required') {
    //   errors.category = 'Category is required';
    // }
  
  
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

  
// controller actions

module.exports.getAllCrops = function (req, res, next) {
    Crop.find({}).then(function (crops) {
        res.status(200).send(crops);
    }).catch(next);
}

module.exports.getFilteredCrops = function (req, res, next) {
    categoryArray = req.body;
    Crop.find({ category: { $in: categoryArray }}).then(function (crops) {
        res.status(200).send(crops);
    }).catch(next);
}


module.exports.getCropById = function (req, res, next) {
    id = req.params.id;
    Crop.findById(id).then(function (crop) {
            if(crop){
                const{ name, category, quantity, address, description, farmerEmail, dateOfPublish, cropImage} = crop;
                axios.get("http://localhost:4000/api/farmer/get/"+crop.farmerEmail, {
                headers: {
                    authorization: req.headers.authorization
                }
                }).then(function (response) {
                    // console.log("axios success");
                    // console.log(response);
                    res.status(200).json({name, category, quantity, address, description, farmerEmail, dateOfPublish, cropImage, farmerName: response.data.name, farmerPhone: response.data.phone});
                }).catch(next);
            }
            else{
                res.status(404).json({ error: "Crop does not exits with given id" });
            }
        // res.send(crop);
    }).catch(next);
}

module.exports.getCropsByFarmerEmail = function (req, res, next) {
    Crop.find({ farmerEmail: req.params.email }).then(function (crops) {
        res.status(200).send(crops);
    }).catch(next);
}


module.exports.getSubscribedCrop = function (req, res, next) {
    // console.log("inside crop function");
    subscribedCrops = req.body.subscribedCrops;
    categoryArray = req.body.categoryArray;
    // console.log(req.body);
    Crop.find({$and: [ { name: { $in: subscribedCrops } },{ category: { $in: categoryArray }}]})
        .then(function (crops) {
            res.status(200).send(crops);
        }).catch(next);
}

// add a new crop details
module.exports.postCrop = function (req, res, next) {
    // console.log(req.file);
    req.body.farmerEmail = req.email;
    if(req.file){
        req.body.cropImage = req.file.path;
        // console.log(req.body);
        Crop.create(req.body)
            .then(function (crop) {
                res.status(200).send(crop);
            })
            .catch( function (err) {
                const errors = handleErrors(err);
                res.status(400).json({ errors });
              });
    }
    else{
        res.status(422).json({ error: "Image is required" });
    }
    
}


module.exports.updateCropById = function(req, res, next){
    Crop.findOne({_id: req.params.id})
    .then(function(crop){
        if(crop.farmerEmail != req.email){
            res.status(401).json({ "error" : "You are not authorized" });
        }
        else{
            Crop.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then(function () {
                Crop.findOne({ _id: req.params.id })
                .then(function (crop) {
                    res.status(200).send(crop);
                });
            })
            .catch(next);
        }
        
    })
    .catch(next);
  }


module.exports.deleteCropById = function (req, res, next) {
    Crop.findOne({_id: req.params.id})
    .then(function(crop){
        if(crop.farmerEmail != req.email){
            res.status(401).json({ "error" : "You are not authorized" });
        }
        else{
            Crop.findByIdAndRemove({ _id: req.params.id })
                .then(function (crop) {
                    res.status(200).send(crop);
                })
                .catch(next);
        }
    })
    .catch(next);
}
