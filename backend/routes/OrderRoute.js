var constants= require('../config.json')
var mysql = require('mysql');
const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection= db.connection;


//addOrder

router.get('/:Restaurant_ID', function(req, res){
   connection.query("SELECT * FROM ORDER_DETAILS WHERE Restaurant_ID='"+req.params.Restaurant_ID+"'", async function(error, results){
    console.log(error, results,'aaaa')
    if(error){
      res.end(error.code)
    }else{
      res.end(JSON.stringify(results))
    }
  });
});


router.get('/',async function(req, res){
    //console.log(req)
    //console.log(res)
      await connection.query("SELECT * FROM ORDER_DETAILS WHERE Cust_ID ='"+req.body.Cust_ID+"'", async function(error, results){
        if(error){
          res.writeHead(200, {
            'Content-Type':'text/plain'
          });
          res.end(error.code)
        }else{
          res.writeHead(200, {
            'Content-Type':'text/plain'
          });
          res.end(JSON.stringify(results))
        }
      });
    });


    
router.post('/:OrderID',async function(req, res){
  var body= req.body;
  const sqlput = "UPDATE ORDER_DETAILS SET Delivery_Status=? where Order_ID=?";
  var values=[body.Delivery_Status,req.params.OrderID]
  console.log(values)
  
  connection.query(sqlput, values, async function(error, results){
    if(error){
      res.writeHead(200, {
        'Content-Type':'text/plain'
      });
      res.end(error.code)
    }else{
      res.writeHead(200, {
        'Content-Type':'text/plain'
      });
      res.end(JSON.stringify(results))
    }
  });
});


    module.exports= router
  