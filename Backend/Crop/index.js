const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// set up express app
const app = express();

//using cors to send data to another port
app.use(cors());

//swagger
const swaggerOptions = {
    swaggerDefinition: {
       info:{
           title: 'Crop Microservice API',
           version: '1.0.0',
           description: 'API for managing crop related operations in application',
           contact: {
               name: 'Prafull Gharat',
               email: 'prafulgharat64@gmail.com'
           }
       } ,
       servers: ["http://localhost:3000"]
    },
    apis: ['./routes/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/uploads', express.static('uploads'));

// connect to mongodb
const dbURL = 'mongodb+srv://'+ process.env.MONGODB_USERNAME +':' + process.env.MONGODB_PASS+ '@cluster0.1oubi.mongodb.net/crop?retryWrites=true&w=majority';
mongoose.connect(dbURL,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true,  useFindAndModify: false });
mongoose.Promise = global.Promise;

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api/', require('./routes/cropRoutes'));

// error handling middleware
app.use(function(err, req, res, next){
    // console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(3000, function(){
    console.log('listening for requests on port 3000');
});
