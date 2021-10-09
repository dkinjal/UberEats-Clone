var constants= require('../config.json')
var mysql = require('mysql');
const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection= db.connection;


router.get('/one/:Restaurant_ID',async function(req, res){
    await connection.query("SELECT * FROM RESTAURANT_DETAILS WHERE Restaurant_ID='"+req.params.Restaurant_ID+"'", async function(error, results){
      console.log(error, results)
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

  //getAllRestaurants
  router.get('/',async function(req, res){
    await connection.query("SELECT * FROM RESTAURANT_DETAILS", async function(error, results){
      if(error){
        res.writeHead(500, {
          'Content-Type':'text/plain'
        });
        res.end(error.code)
      }else{
        res.writeHead(200, {
          'Content-Type':'text/plain'
        });
        console.log(JSON.stringify(results))
        res.end(JSON.stringify(results))
      }
    });
  });

//addRestaurantDetails
  router.post('/',async function(req, res){
    body= req.body
    const sqlput = "INSERT INTO RESTAURANT_DETAILS (Restaurant_Name, Restaurant_Description, Restaurant_Contact, Restaurant_Type, Restaurant_Time_From, Restaurant_Time_To, Restaurant_Delivery_Mode, Restaurant_Cuisine, Restaurant_Day_From, Restaurant_Day_To) VALUES (?,?,?,?,?,?,?,?,?,?)";
    var values=[body.Restaurant_Name, body.Restaurant_Description, body.Restaurant_Contact, body.Restaurant_Type, body.Restaurant_Time_From, body.Restaurant_Time_To, body.Restaurant_Delivery_Mode, body.Restaurant_Cuisine, body.Restaurant_Day_From, body.Restaurant_Day_To]
  
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

//updateRestaurantDetails
  router.post('/:RestID',async function(req, res){
    var body= req.body;
    const sqlput = "UPDATE  RESTAURANT_DETAILS SET Restaurant_Name=?,Restaurant_Description=?,Restaurant_Contact=?, Restaurant_Type=?, Restaurant_Time_From=?, Restaurant_Time_To=?, Restaurant_Delivery_Mode=?, Restaurant_Cuisine=?, Restaurant_Day_From=?, Restaurant_Day_To=? WHERE Restaurant_ID=?";
    var values=[body.Restaurant_Name, body.Restaurant_Description, body.Restaurant_Contact, body.Restaurant_Type, body.Restaurant_Time_From, body.Restaurant_Time_To, body.Restaurant_Delivery_Mode, body.Restaurant_Cuisine, body.Restaurant_Day_From, body.Restaurant_Day_To, req.params.RestID]
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


  router.get('/getLocationRestaurant',async function(req, res){
    //console.log(req)
    //console.log(res)
      await connection.query("SELECT * FROM RESTAURANT_DETAILS where Restaurant_Location='"+req.body.Restaurant_Location +"'", async function(error, results){
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
  

  router.get('/menu/:Restaurant_ID',async function(req, res){
    console.log('inside menu api')
    await connection.query("SELECT * FROM RESTAURANT_MENU WHERE RESTAURANT_ID='"+req.params.Restaurant_ID+"' ", async function(error, results){
      console.log(error, results)
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

  
  router.put('/updateDeliveryStatus',async function(req, res){
    var body= req.body;
    const sqlput = "UPDATE ORDER_DETAILS SET Delivery_Status=? where Order_ID =?";
    var values=[body.Delivery_Status, body.Order_ID]
  
    connection.query(sqlput, values, async function(error, results){
      console.log(query.toString)
      console.log(error)
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

  

  router.put('/addDish',async function(req, res){
    var body= req.body;
    console.log(req.body)
    const sqlput = "INSERT INTO RESTAURANT_MENU (Dish_Name, Ingredients, Dish_Category, Dish_Description, Dish_Cost, Restaurant_Name) VALUES (?,?,?,?,?,?)";
    var values=[body.Dish_Name, body.Ingredients, body.Dish_Category, body.Dish_Description, body.Dish_Cost, body.Restaurant_Name]
  
    connection.query(sqlput, values, async function(error, results){
      console.log(query.toString+"asdfg")
      console.log(error+"mnbv")
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


  router.put('/updateDishDetails',async function(req, res){
    var body= req.body;
    console.log(req.body)
    const sqlput = "Update RESTAURANT_MENU SET Dish_Name=?, Ingredients=?, Dish_Category=?, Dish_Description=?, Dish_Cost=?, Restaurant_Name=? WHERE Dish_ID=?";
    var values=[body.Dish_Name, body.Ingredients, body.Dish_Category, body.Dish_Description, body.Dish_Cost, body.Restaurant_Name, body.Dish_ID]
  
    connection.query(sqlput, values, async function(error, results){
      console.log(query.toString+"asdfg")
      console.log(error+"mnbv")
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
  
  
  router.put('/addDish',async function(req, res){
    var body= req.body;
    console.log(req.body)
    const sqlput = "INSERT INTO RESTAURANT_MENU (Dish_Name, Ingredients, Dish_Category, Dish_Description, Dish_Cost, Restaurant_Name) VALUES (?,?,?,?,?,?)";
    var values=[body.Dish_Name, body.Ingredients, body.Dish_Category, body.Dish_Description, body.Dish_Cost, body.Restaurant_Name]
  
    connection.query(sqlput, values, async function(error, results){
      console.log(query.toString+"asdfg")
      console.log(error+"mnbv")
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
