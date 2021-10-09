const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection= db.connection;
const bcrypt = require('bcryptjs');
const saltRounds=10;


//New user Register
router.post('/signup',async function(req, res){
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  console.log(name, password)
  bcrypt.hash(password, saltRounds, (err, hash)=>{
    connection.query("INSERT INTO CUSTOMER_DETAILS (Cust_Name,Cust_Password, Cust_Email) VALUES (?,?,?)",[name, hash, email], async function(error, results){
      if(error){
        // res.writeHead(200, {
        //   'Content-Type':'text/plain'
        // });
        if(error.code=1062){
          res.send({message:"Email already exists. Please login."})
        }else{
          res.send({message:error.message})
        }
      }else{
        
        console.log(JSON.stringify(results))
        res.send({message:"Success"})
      }
    });
  })
  });

  
//User Login
router.post('/login',async function(req, res){
  
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password)
  // connection.query("SELECT * FROM USER WHERE Cust_ID = '"+{username}+"'",
  connection.query("SELECT * FROM CUSTOMER_DETAILS WHERE Cust_Email = ?;",
    email, 
  function(error, results){
    if(error){
      console.log('aaa'+error)
      res.send({error:error})
    }
    console.log(results.length)
      if(results.length>0){
        console.log(password, '-----',results[0].Cust_Password)
        bcrypt.compare(password, results[0].Cust_Password,(err,response)=>{
          if(response){
            res.cookie('cookie',email,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user= results
            console.log(results)
            res.send(results)
          }else{
            console.log(results)
            res.send({message:"Wrong username/password!"})
          }
        });
      }else{
        console.log('eee')
        res.send({message:"User doesn't exist!"})
            }
    
  });
})

////////////////////////Restaurant----------------------------------------------

router.post('/restsignup',async function(req, res){
  const restname = req.body.restname;
  const password = req.body.password;
  const email = req.body.email;
  const location = req.body.location
  bcrypt.hash(password, saltRounds, (err, hash)=>{
    connection.query("INSERT INTO RESTAURANT_DETAILS (Restaurant_Name,Restaurant_Password, Restaurant_Email, Restaurant_Location) VALUES (?,?,?,?)",[restname, hash, email, location], async function(error, results){
      if(error){
        // res.writeHead(200, {
        //   'Content-Type':'text/plain'
        // });
        if(error.code=1062){
          res.send({message:"Email already exists. Please login."})
        }else{
          res.send({message:error.message})
        }
      }else{
        console.log(JSON.stringify(results))
        res.send({message:"Success"})
      }
    });
  })
  });


  router.post('/restlogin',async function(req, res){
  
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password)
    // connection.query("SELECT * FROM USER WHERE Cust_ID = '"+{username}+"'",
    connection.query("SELECT * FROM RESTAURANT_DETAILS WHERE Restaurant_Email = ?;",
      email, 
    function(error, results){
      if(error){
        console.log('aaa'+error)
        res.send({error:error})
      }
      console.log(results.length)
        if(results.length>0){
          console.log(password, '-----',results[0].Cust_Password)
          bcrypt.compare(password, results[0].Cust_Password,(err,response)=>{
            if(response){
              req.session.user= results
              res.send(results)
            }else{
              console.log(results)
              res.send({message:"Wrong username/password!"})
            }
          });
        }else{
          console.log('eee')
          res.send({message:"User doesn't exist!"})
              }
      
    });
  })


  module.exports= router
