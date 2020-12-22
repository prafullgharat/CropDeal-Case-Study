const Dealer = require('../models/Dealer.model');
const User = require('../models/User.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
axios = require('axios');

const secretKey = "secret key";


module.exports.getAllDealers = function (req, res, next) {
  Dealer.find({}).then(function (dealers) {
    res.status(200).send(dealers);
  }).catch(next);
}

module.exports.getDealerByEmail = function (req, res, next) {
  email = req.params.email;
  Dealer.findOne({ email: email }).then(function (dealer) {
    if (dealer) {
      res.status(200).send(dealer);
    }
    else {
      res.status(404).json({ error: "User does not exits with given email id" });
    }
  }).catch(next);
}

module.exports.getSubscription = function (req, res, next) {
  email = req.email;
  Dealer.findOne({ email: email }).then(function (dealer) {
    res.status(200).send(dealer.subscribed_crops);
  }).catch(next);
}

module.exports.postDealer = function (req, res, next) {
  Dealer.create(req.body).then(function (dealer) {
    res.send(dealer);
  }).catch(next);
}

//update dealer by using email id
module.exports.updateDealer = function (req, res, next) {
  Dealer.findOneAndUpdate({ email: req.params.email }, req.body)
    .then(function () {
      Dealer.findOne({ email: req.params.email }).then(function (dealer) {
        if (dealer) {
          res.status(200).send(dealer);
        }
        else {
          res.status(404).json({ error: "User does not exits with given email id" });
        }

      });
    })
    .catch(next);
}

//update dealer photo by using email id
module.exports.updateDealerPhoto = function (req, res, next) {
  console.log(req.body);
  Dealer.findOneAndUpdate({ email: req.params.email }, { photo: req.file.path })
    .then(function () {
      Dealer.findOne({ email: req.params.email }).then(function (dealer) {
        res.status(200).send(dealer);
      });
    })
    .catch(next);
}

module.exports.deleteDealerByEmail = function (req, res, next) {
  User.deleteOne({ email: req.params.email })
    .then(function () {
      // console.log(" deleted from user collection")
      Dealer.deleteOne({ email: req.params.email })
        .then(function (dealer) {
          // console.log(" deleted from dealer collection");
          // res.status(200).send(dealer);
          res.status(200).send({ message: "Dealer Deleted" });
        })
        .catch(next);
    })
    .catch(next);
}


//subscribe to crop
module.exports.subscribeToCrop = function (req, res, next) {
  // console.log(req.body);
  Dealer.findOne({ email: req.email })
    .then(function (dealer) {
      // console.log(req.body);
      if (dealer.subscribed_crops.includes(req.body.cropName)) {
        res.status(422).send({ error: "Already Subscribed" });
      }
      else {
        dealer.subscribed_crops.push(req.body.cropName);
        dealer.save().then(res.status(200).send(dealer.subscribed_crops));
      }
    }
    )
    .catch(next);
}

//unsubscribe to crop
module.exports.unSubscribeCrop = function (req, res, next) {
  // console.log(req.body);
  Dealer.findOne({ email: req.email })
    .then(function (dealer) {
      // console.log(req.body);
      var index = dealer.subscribed_crops.indexOf(req.body.cropName);
      // console.log(index);
      if (index >= 0) {
        // delete dealer.subscribed_crops[index]; 
        dealer.subscribed_crops.splice(index, 1);
      }
      dealer.save().then(res.status(200).send(dealer.subscribed_crops));
    }
    )
    .catch(next);
}

//get subscribed crops 
module.exports.getSubscribedCrops = function (req, res, next) {
  email = req.email;
  // console.log(email);
  Dealer.findOne({ email: email })
    .then(function (dealer) {
      // get data from crop microservice
      axios.post("http://localhost:3000/api/crop/dealer", {
        headers: {
          authorization: req.headers.authorization
        },
        subscribedCrops: dealer.subscribed_crops,
        categoryArray: req.body
      }).then(function (response) {
        console.log("axios success");
        // console.log(response);
        res.status(200).json(response.data);
      }).catch(next);
    })
    .catch(next);
}






