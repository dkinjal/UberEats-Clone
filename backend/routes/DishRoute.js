const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection= db.connection;


//addOrder

router.get('/:Dish_ID', function(req, res){
   connection.query("SELECT * FROM DISH_DETAILS WHERE Restaurant_ID='"+req.params.Dish_ID+"'", async function(error, results){
    console.log(error, results,'aaaa')
    if(error){
      res.end(error.code)
    }else{
      res.end(JSON.stringify(results))
    }
  });
});


router.post('/', function(req, res){
  connection.query("SELECT * FROM DISH_DETAILS WHERE Restaurant_ID='"+req.params.Dish_ID+"'", async function(error, results){
   console.log(error, results,'aaaa')
   if(error){
     res.end(error.code)
   }else{
     res.end(JSON.stringify(results))
   }
 });
});

