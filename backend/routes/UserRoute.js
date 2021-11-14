const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection= db.connection;
const bcrypt = require('bcryptjs');
const saltRounds=10;
const jwt = require('jsonwebtoken');
var kafka = require('../kafka/client')
const Customer= require('../Models/CustomerModels');
const Restaurant = require('../Models/RestaurantModels');
const mongoose = require('mongoose');
const {secret} = require('../config');
const { auth, checkAuth, checkAuthRest } = require('../Utils/passport');


//New user Register
router.post('/signup',async function(req, res){
//   const name = req.body.name;
//   const password = req.body.password;
//   const email = req.body.email;
//   console.log(name, password)
//   bcrypt.hash(password, saltRounds, (err, hash)=>{
//   const customer= new Customer({
//     CustID: mongoose.Types.ObjectId(),
//     Cust_Email : email,
//     Cust_Password: hash,
//     Cust_Name: name
//   })
//   customer.save().then(result=>{
//     console.log(result)
//   })
//   .catch(error=>{
//     console.log(error)
//   });
//   res.status(200).json({
//     message: "Success",
//     product: customer
//   })
// })
kafka.make_request('post_user',req.body, function(err,results){
  console.log('in result of post user');
  console.log(results);
  if (err){
      console.log("Inside err");
      res.json({
          status:"error",
          msg:"System Error, Try Again."
      })
  }else{
      console.log("Inside else");
          res.json({
              updatedList:results
          });

          res.end();
      }
  
});
  });

  
//User Login
router.post('/login',async function(req, res){
  
  kafka.make_request('cust_login',req.body, function(err,results){
  console.log('in result');
  console.log(results);
  if (err){
      console.log("Inside err");
      res.json({
          status:"error",
          msg:"System Error, Try Again."
      })
  }else{
    console.log("Inside success");    
    const payload = { _id: results.Cust_ID, email: results.Cust_Email};
    const token = jwt.sign(payload, secret, {
      expiresIn: 1008000
    });
    results.token = "JWT " + token;
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(results));
    // res.json({
    //           updatedList:results
    //       });

          res.end();
      }
  
});
  // Customer.find({"Cust_Email": email}).exec().then(doc=>{
  //   console.log(doc +"userroute 67");
  //   bcrypt.compare(password, doc[0].Cust_Password,(err,response)=>{
  //     if(response){
  //       console.log('success userroute 70'+ response)
  //       const payload = { _id: doc.Cust_ID, email: doc.Cust_Email};
  //       const token = jwt.sign(payload, secret, {
  //         expiresIn: 1008000
  //       });


        //console.log('success')
        //res.cookie('cookie',email,{maxAge: 900000, httpOnly: false, path : '/'});
        //req.session.user= results
        // console.log(doc)
        // res.send(doc[0])




//         let output = doc[0];
//         console.log(doc[0])
//         doc[0].token = "JWT " + token;
//         console.log(output+"after1 jwt");
//         res.writeHead(200, {
//           "Content-Type": "application/json",
//         });
//         //res.status(200).end("JWT " + token);
//         res.end(JSON.stringify(output));
//         }else{
//           console.log(err +"userroute 78")
//           res.status(204).send("Invalid creds")
//         }
//     });
  
  

// });
});

// let op = {
        //   "JWT": token,
        //   "output":doc[0]
        // }
        // console.log(op+"op 79")
////////////////////////Restaurant----------------------------------------------

router.post('/restsignup',async function(req, res){
  console.log(req.body)
  const restname = req.body.restname;
  const password = req.body.password;
  const email = req.body.email;
  const location = req.body.location;
  
  bcrypt.hash(password, saltRounds, (err, hash)=>{
    const restaurant= new Restaurant({
    Restaurant_ID: mongoose.Types.ObjectId(),
    Restaurant_Email : email,
    Restaurant_Password: hash,
    Restaurant_Location: location,
    Restaurant_Name: restname
  })
  restaurant.save().then(result=>{
    console.log(result)
  })
  .catch(error=>{
    console.log(error)
  });
  res.status(200).json({
    message: "Success",
    product: restaurant
  })
  })
  });

router.post('/restlogin', async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password)
  // Restaurant.find({"Restaurant_Email": email}).exec().then(doc=>{
  //   console.log(doc[0]);
  //   bcrypt.compare(password, doc[0].Restaurant_Password,(err,response)=>{
  //     if(response){
  //       console.log('success'+ response)
  //       //req.session.user= res;
  //       res.send(doc[0]);
  //     }else{
  //       console.log(err +"kkk")
  //       res.status(204).send("Invalid creds")
  //     }
  //   });

  kafka.make_request('rest_login', req.body, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {
      console.log("Inside success");
      const payload = { _id: results.Cust_ID, email: results.Cust_Email };
      const token = jwt.sign(payload, secret, {
        expiresIn: 1008000
      });
      results.token = "JWT " + token;
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(results));
      res.end();

    }
  })
})


  module.exports= router
