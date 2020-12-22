const nodemailer = require('nodemailer');
require('dotenv').config();

var transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
       
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    }
});

module.exports.sendMail = (mailOptions) =>{
    transport.sendMail(mailOptions, function(err, info){
        if(err){
            console.log("error:" +err);
        }
        else{
            console.log("Email sent:" +info.response)
        }
    })
    
}
