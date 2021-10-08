const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection= db.connection;


//addOrder

router.get('/:Dish_ID', function(req, res){
   connection.query("SELECT * FROM RESTAURANT_MENU WHERE Restaurant_ID='"+req.params.Dish_ID+"'", async function(error, results){
    console.log(error, results,'aaaa')
    if(error){
      res.end(error.code)
    }else{
      res.end(JSON.stringify(results))
    }
  });
});


router.post('/:Dish_ID',async function(req, res){
  var body= req.body;
  console.log(req.body)
  const sqlput = "Update RESTAURANT_MENU SET Dish_Name=?, Ingredients=?, Dish_Category=?, Dish_Description=?, Dish_Cost=?  WHERE Dish_ID=?";
  var values=[body.DishName, body.MainIngredients, body.DishCategory, body.DishDescription, body.DishCost, req.params.Dish_ID]
  connection.query(sqlput, values, async function(error, results){

  console.log(error, results,'bbb')
   if(error){
     res.end(error.code)
   }else{
     res.end(JSON.stringify(results))
   }
  })
 });

 router.post('/',async function(req, res){
  var body= req.body;
  console.log(body.RestID +'mmm')
  const sqlput = "INSERT INTO RESTAURANT_MENU (Dish_Name, Ingredients, Dish_Category, Dish_Description, Dish_Cost, Restaurant_ID) VALUES (?,?,?,?,?,?)";
  console.log(sqlput)
  var values=[body.DishName, body.MainIngredients, body.DishCategory, body.DishDescription, body.DishCost, body.RestID]
  connection.query(sqlput, values, async function(error, results){

  console.log(error, results,'bbb')
   if(error){
     res.end(error.code)
   }else{
     res.end(JSON.stringify(results))
   }
  })
 });


module.exports= router