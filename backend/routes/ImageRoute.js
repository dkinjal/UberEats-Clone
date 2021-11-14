const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const express = require("express");
var router = express.Router();
var mysql = require('mysql');
var db = require("../dbConnection");
var connection= db.connection;
var Customer = require('../Models/CustomerModels')
var Restaurant = require('../Models/RestaurantModels')
var Menu = require('../Models/MenuModels')


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


router.post('/cust/:ID', (req, res) => {
  profileImgUpload(req, res, (error) => {
    console.log('requestOkokok', req.file);
    console.log('requestOkokok', req.body);
    
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        //console.log( 'Error: No File Selected!' );
        res.json('Error: No File Selected');
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;// Save the file name into database into profile model
        const ID = req.file.ID;
        console.log(ID + 'IDddddd')
        // res.json( {
        //  image: imageName,
        //  location: imageLocation
        // });

        //   const sqlput =
        //     "UPDATE  CUSTOMER_DETAILS SET Cust_Profile_Name =?, Cust_Profile_Location=? WHERE Cust_ID =?"
        //   var values = [
        //     imageName, imageLocation, req.params.ID
        //  ];
        Customer.findOneAndUpdate({ "Cust_ID": req.params.ID }, {
          "Cust_Profile_Location": imageLocation,
          "Cust_Profile_Name": imageName

        })
          .exec().then(doc => {
            console.log("Success aaa" + doc)
            res.send("Success");
          }).catch(error => {
            console.log(error + "iii")
          })
      }
    }
})
      
        // connection.query(sqlput, values,  function (error, results) {
        //   console.log(error, results, 'aaaaa')
        //   if (error) {
        //     console.log('inside error')  
        //     res.writeHead(200, {
        //       "Content-Type": "text/plain",
        //     });
        //     res.end(error.code);
        //   } else {
        //     console.log('in success')  
        //     // res.writeHead(200, {
        //     //   "Content-Type": "text/plain",
        //     // });
        //     res.end(JSON.stringify(results));
        //   }
        // });
      //});
    ////////////sql query end///////////////
    
   });
  


  router.post( '/dish/:ID', ( req, res ) => 
  {console.log('Inside dish image upload'+ req.params.ID)
    profileImgUpload( req, res, ( error ) => {
       console.log( 'requestOkokok', req.file );
      // console.log(req.body)
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
        const ID = req.file.ID;
        console.log(ID+'IDddddd')
        res.json( {
         image: imageName,
         location: imageLocation
        });
      /////////////////sql query//////////////
      // router.put("/", async function (req, res) {
          //var body = req.body;
          //console.log(req.body);
          // const sqlput =
          //   "UPDATE  RESTAURANT_MENU SET DISH_IMAGE_LOCATION=? WHERE DISH_ID =?"
          // var values = [
          //    imageLocation, req.params.ID
          // ];
         console.log(req.params.ID+ "Dish ID")
         Menu.findOneAndUpdate({ "Dish_ID": req.params.ID }, {
           "Dish_Image_Location": imageLocation,
           "Dish_Profile_Name": imageName
        })
          .exec().then(doc => {
            console.log("Success aaa" + doc)
            res.send("Success");
          }).catch(error => {
            console.log(error + "iii")
          })
          // connection.query(sqlput, values,  function (error, results) {
          //   console.log(error, results, 'aaaaa')
          //   if (error) {
          //     console.log('inside error')  
          //     res.writeHead(200, {
          //       "Content-Type": "text/plain",
          //     });
          //     res.end(error.code);
          //   } else {
          //     console.log('in success')  
          //     // res.writeHead(200, {
          //     //   "Content-Type": "text/plain",
          //     // });
          //     res.end(JSON.stringify(results));
          //   }
          // });
        //});
      ////////////sql query end///////////////
      }
      }
     });
    });
  
    router.post( '/rest/:ID', ( req, res ) => 
    {
      profileImgUpload( req, res, ( error ) => {
        console.log( 'requestOkokok', req.file );
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
          const ID = req.file.ID;
          console.log(ID+'IDddddd')
          res.json( {
           image: imageName,
           location: imageLocation
          });
        
            // const sqlput =
            //   "UPDATE  RESTAURANT_DETAILS SET Restaurant_Profile_Location =? WHERE Restaurant_ID =?"
            // var values = [
            //    imageLocation, req.params.ID
            // ];
           Restaurant.findOneAndUpdate({ "Restaurant_ID": req.params.ID }, {
          "Restaurant_Profile_Location": imageLocation,
          "Restaurant_Profile_Name": imageName

        })
          .exec().then(doc => {
            console.log("Success aaa" + doc)
            res.send("Success");
          }).catch(error => {
            console.log(error + "iii")
          })
          
            // connection.query(sqlput, values,  function (error, results) {
            //   console.log(error, results, 'aaaaa')
            //   if (error) {
            //     console.log('inside error')  
            //     res.writeHead(200, {
            //       "Content-Type": "text/plain",
            //     });
            //     res.end(error.code);
            //   } else {
            //     console.log('in success')  
            //     // res.writeHead(200, {
            //     //   "Content-Type": "text/plain",
            //     // });
            //     res.end(JSON.stringify(results));
            //   }
            // });
          //});
        ////////////sql query end///////////////
        }
        }
       });
      });
    
  module.exports = router;