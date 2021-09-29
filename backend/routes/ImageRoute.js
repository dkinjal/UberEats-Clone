const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const express = require("express");
var router = express.Router();
var mysql = require('mysql');
var db = require("../dbConnection");
var connection= db.connection;



const s3 = new aws.S3({
    accessKeyId: 'AKIAXUKC3TYXL6D6T2QM',
    secretAccessKey: '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',
    Bucket: 'uber-bucket-kd'
   });

function checkFileType( file, cb ){
// Allowed ext
const filetypes = /jpeg|jpg|png|gif/;
// Check ext
const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
// Check mime
const mimetype = filetypes.test( file.mimetype );if( mimetype && extname ){
    return cb( null, true );
} else {
    cb( 'Error: Images Only!' );
}
}

const profileImgUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: 'uber-bucket-kd',
     acl: 'public-read',
     key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
    limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
   }).single('profileImage');


router.post( '/', ( req, res ) => 
{profileImgUpload( req, res, ( error ) => {
    console.log( 'requestOkokok', req.file );
    //console.log( 'error', error );
    if( error ){
     console.log( 'errors', error );
     res.json( { error: error } );
    } else {
     // If File not found
     if( req.file === undefined ){
      //console.log( 'Error: No File Selected!' );
      res.json( 'Error: No File Selected' );
     } else {
      // If Success
      const imageName = req.file.key;
      const imageLocation = req.file.location;// Save the file name into database into profile model
      res.json( {
       image: imageName,
       location: imageLocation
      });
    /////////////////sql query//////////////
    // router.put("/", async function (req, res) {
        //var body = req.body;
        //console.log(req.body);
        const sqlput =
          "UPDATE  CUSTOMER_DETAILS SET Cust_Profile_Name =?, Cust_Profile_Location=? WHERE Cust_ID =?"
        var values = [
          imageName, imageLocation, '1'
        ];
      
        connection.query(sqlput, values,  function (error, results) {
          console.log(error, results, 'aaaaa')
          if (error) {
            console.log('inside error')  
            res.writeHead(200, {
              "Content-Type": "text/plain",
            });
            res.end(error.code);
          } else {
            console.log('in success')  
            // res.writeHead(200, {
            //   "Content-Type": "text/plain",
            // });
            res.end(JSON.stringify(results));
          }
        });
      //});
    ////////////sql query end///////////////
    }
    }
   });
  });

  module.exports = router;