var constants= require('../config.json')
var mysql = require('mysql');
const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
const Restaurant = require('../Models/RestaurantModels')
const Menu = require('../Models/MenuModels')
const Order = require('../Models/OrderModels')
const { checkAuth } = require("../utils/passport");
const mongoose = require('mongoose');


router.get('/one/:Restaurant_ID',async function(req, res){
  console.log(req.params.Restaurant_ID+ "inside one rest")
    Restaurant.find({"Restaurant_ID": req.params.Restaurant_ID})
    .exec().then(doc=>{
      //console.log(doc[0]);
          //req.session.user= res;
          res.status(200).json({
            message: "Success",
            product: doc[0]
          })
      }).catch (error=>{
        console.log(error);
      }) 
  });

  //getAllRestaurants
  router.get('/',async function(req, res){
    Customer.find().exec().then(doc=>{
          //req.session.user= res;
          res.status(200).json({
            message: "Success",
            product: doc[0]
          })
      }).catch (error=>{
        console.log(error);
      }) 
  });


//addRestaurantDetails
  router.post('/',async function(req, res){
    body= req.body
    
    const restaurant = new Restaurant({
      "Restaurant_Name":body.Restaurant_Name,
      "Restaurant_Description":body.Restaurant_Description,
      "Restaurant_Contact":body.Restaurant_Contact,
      "Restaurant_Type":body.Restaurant_Type,
      "Restaurant_Time_From":body.Restaurant_Time_From,
      "Restaurant_Time_To":body.Restaurant_Time_To,
      "Restaurant_Delivery_Mode":body.Restaurant_Delivery_Mode,
      "Restaurant_Cuisine":body.Restaurant_Cuisine,
      "Restaurant_Day_From":body.Restaurant_Day_From, 
      "Restaurant_Day_To":body.Restaurant_Day_To
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
    }); 

//updateRestaurantDetails
  router.post('/:RestID',async function(req, res){
    var body= req.body;

    Restaurant.findOneAndUpdate({"Restaurant_ID": req.params.RestID},{
      "Restaurant_Name": body.RestName,
      "Restaurant_Description":body.RestDescription,
      "Restaurant_Contact": body.RestContact,
      "Restaurant_Type":body.RestType,
      "Restaurant_Time_From":body.RestTimingFrom,
      "Restaurant_Time_To":body.RestTimingTo,
      "Restaurant_Delivery_Mode":body.RestDeliveryMode, 
      "Restaurant_Cuisine":body.RestCuisine,
      "Restaurant_Day_From":body.RestDayFrom,
      "Restaurant_Day_To":body.RestDayTo,
    }).exec().then(doc=>{
      console.log("Success aaa"+ doc[0])
      res.send("Success");
    }).catch(error=>{console.log(error+"iii")})
  });
    
    

  router.get('/getLocationRestaurant',async function(req, res){
    Restaurant.find({"Restaurant_Location": req.body.Restaurant_Location}).exec().then(doc=>{
          //req.session.user= res;
          res.status(200).json({
            message: "Success",
            product: doc[0]
          })
      }).catch (error=>{
        console.log(error);
      }) 
    });
  

  router.get('/menu/:Restaurant_ID',async function(req, res){
    console.log('inside menu api')
    Menu.find({"Restaurant_ID": req.params.Restaurant_ID}).exec().then(doc=>{
      console.log(doc);
          //req.session.user= res;
          res.status(200).json({
            message: "Success",
            product: JSON.stringify(doc)
          })
      }).catch (error=>{
        console.log(error);
      }) 
    });
  
  router.put('/updateDeliveryStatus',async function(req, res){
    var body= req.body;
   
    Order.findOneAndUpdate({"Order_ID": body.Order_ID},{
      "Delivery_Status": body.Delivery_Status
    }).exec().then(doc=>{
      console.log("Success aaa"+ doc[0])
      res.send("Success");
    }).catch(error=>{console.log(error+"iii")})
  });
  
  

  router.put('/addDish',async function(req, res){
    var body= req.body;
    console.log(req.body)
    
    const menu = new Menu({
      "Dish_Name":body.Dish_Name,
      "Ingredients":body.Ingredients,
      "Dish_Category":body.Dish_Category,
      "Dish_Description":body.Dish_Description,
      "Dish_Cost": body.Dish_Cost, 
      "Restaurant_Name": body.Restaurant_Name,
      "Dish_ID":mongoose.Types.ObjectId()
    })
    menu.save().then(result=>{
      console.log(result)
    })
    .catch(error=>{
      console.log(error)
    });
    res.status(200).json({
      message: "Success",
      product: menu
    })
    }); 


  router.put('/updateDishDetails',async function(req, res){
    var body= req.body;
    console.log(req.body)
    const sqlput = "Update RESTAURANT_MENU SET Dish_Name=?, Ingredients=?, Dish_Category=?, Dish_Description=?, Dish_Cost=?, Restaurant_Name=? WHERE Dish_ID=?";
    var values=[body.Dish_Name, body.Ingredients, body.Dish_Category, body.Dish_Description, body.Dish_Cost, body.Restaurant_Name, body.Dish_ID]
  
    Menu.findOneAndUpdate({"Dish_ID":body.Dish_ID},{
      "Dish_Name": body.Dish_Name,
      "Ingredients":body.Ingredients,
      "Dish_Category":body.Dish_Category,
      "Dish_Description": body.Dish_Description,
      "Dish_Cost": body.Dish_Cost,
      "Restaurant_Name":body.Restaurant_Name
    }).exec().then(doc=>{
      console.log("Success aaa"+ doc[0])
      res.send("Success");
    }).catch(error=>{console.log(error+"iii")})
    });

  // router.put('/addDish',async function(req, res){
  //   var body= req.body;
  //   console.log(req.body)
    
  //   const menu = new Menu({
  //     "Dish_Name":body.Dish_Name,
  //     "Ingredients":body.Ingredients,
  //     "Dish_Category": body.Dish_Category,
  //     "Dish_Description":body.Dish_Description,
  //     "Dish_Cost":body.Dish_Cost, 
  //     "Restaurant_Name":body.Restaurant_Name
  //   })
  //   menu.save().then(result=>{
  //     console.log(result)
  //   })
  //   .catch(error=>{
  //     console.log(error)
  //   });
  //   res.status(200).json({
  //     message: "Success",
  //     product: menu
  //   })
  // }); 


  module.exports= router
