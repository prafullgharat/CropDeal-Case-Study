const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

module.exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, secretKey)
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.id;
    req.email = payload.email;
    // req.body.email = payload.email;

    req.userType = payload.userType;

    next();
}