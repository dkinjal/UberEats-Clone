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
const {auth} = require('../Utils/passport');
auth();

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
  console.log('in result');
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
  const email = req.body.email;
  const password = req.body.password;
  Customer.find({"Cust_Email": email}).exec().then(doc=>{
    console.log(doc[0]);
    bcrypt.compare(password, doc[0].Cust_Password,(err,response)=>{
      if(response){
        console.log('success'+ response)
        const payload = { id: doc[0].Cust_ID, email: doc[0].Cust_Email};
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });
        res.status(200).send(doc[0]).end("JWT " + token);
        //res.send(doc[0]);
      }else{
        console.log(err +"kkk")
        res.status(204).send("Invalid creds")
      }
    });
  

});
});


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

  router.post('/restlogin',async function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password)
    Restaurant.find({"Restaurant_Email": email}).exec().then(doc=>{
      console.log(doc[0]);
      bcrypt.compare(password, doc[0].Restaurant_Password,(err,response)=>{
        if(response){
          console.log('success'+ response)
          //req.session.user= res;
          res.send(doc[0]);
        }else{
          console.log(err +"kkk")
          res.status(204).send("Invalid creds")
        }
      });
    
  
  });
  })


  module.exports= router
