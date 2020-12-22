
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'  ){
        cb(null,true);
    }
    else{
        cb(new Error('file should of type jpeg, jpg or png'),false);
    }
}

module.exports.upload = multer({
    storage: storage,
    limits: {
         fileSize: 1024 * 1024 
        },
    fileFilter : fileFilter
 });