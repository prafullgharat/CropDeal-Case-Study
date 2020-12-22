const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

module.exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({error:'Unauthorized request'})
    }
    let token = req.headers.authorization.split(' ')[1];
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

// module.exports.isAdmin = (req, res, next) => {
//     if (req.userType !== "admin") {
//         return res.status(401).json({error:'Admin Privilege needed'});
//     }
//     next();
// }

module.exports.isFarmer = (req, res, next) => {
    if (req.userType !== "farmer") {
        return res.status(401).json({error:'Farmer Privilege needed'});
    }
    next();
}

// module.exports.isDealer = (req, res, next) => {
//     if (req.userType !== "dealer") {
//       return res.status(401).json({error:'Dealer Privilege needed'});
//     }
//     next();
//   }


// module.exports.isAuthUserOrAdmin = (req, res, next) => {
//     if (req.userType == "admin" || req.params.id == req.userId) {
//         next();
//     }
//     else{
//         return res.status(401).send('Unauthorized request');
//     }
// }