var constants= require('../config.json')
var mysql = require('mysql');
const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection= db.connection;


//addOrder

router.get('/rest/:RestID', function(req, res){
  console.log('RestID'+ req.params.RestID)
   connection.query("SELECT *  FROM ORDER_DETAILS WHERE Restaurant_ID='"+req.params.RestID+"' ", async function(error, results){
    console.log(error, results,'aaaa')
    if(error){
      res.end(error.code)
    }else{
      console.log(results)
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
  var values=[body.DeliveryStatus,req.params.OrderID]
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


router.post('/',async function(req, res){
  var lastRow="SELECT ORDER_ID FROM ORDER_DETAILS ORDER BY ORDER_id DESC LIMIT 1"
  let last =0;
  connection.query(lastRow, function(error, results){
    if(error){
      console.log(error+'aaa')
    }else{
      console.log(JSON.stringify(results[0])+'aaa')
      const row= results[0];
      last = row.ORDER_ID;
      console.log(last+"lastttt")
      var mainbody= req.body;
      console.log(mainbody.length+'length')
      
      var output=[];
  console.log(last+"last")
  for(let q=0; q< mainbody.length; q++){
  const sqlput = "INSERT INTO ORDER_DETAILS (ORDER_ID,Dish_Count, Dish_Name, Delivery_Status, Order_Status, Restaurant_ID, Order_Mode, Cust_ID, Dish_Cost) VALUES(?,?,?,?,?,?,?,?,?)";
  var body= mainbody[q]
  var values=[last+1, body.DishCount,body.DishName, body.DeliveryStatus, body.OrderStatus, body.RestID, body.OrderMode, body.CustID, body.DishCost]
  connection.query(sqlput, values, async function(error, results){
    if(error){
      console.log(error+"error ")
      
      res.send(error.code)
    }else{
      console.log('success')
      // res.writeHead(200, {
      //   'Content-Type':'text/plain'
      // });
      // res.send(JSON.stringify(results))
      output.push(results)
      console.log(output)
    }
  });
} res.send(output)
}});





})


    module.exports= router
  