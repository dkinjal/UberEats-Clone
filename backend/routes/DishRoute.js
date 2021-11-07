const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection= db.connection;
var Menu = require('../Models/MenuModels');

//addOrder

router.get('/:Dish_ID', function(req, res){
  Menu.find({"Dish_ID": req.params.Dish_ID}).exec().then(doc=>{
        //req.session.user= res;
        res.status(200).json({
          message: "Success",
          product: doc[0]
        })
    }).catch (error=>{
      console.log(error);
    })
});

router.get('/rest/:RestID', function(req, res){
  console.log(req.params.RestID, "nnooon")
  Menu.find({"Restaurant_ID": req.params.RestID}).exec().then(doc=>{
    //req.session.user= res;
    res.status(200).json({
      message: "Success",
      product: doc[0]
    })
}).catch (error=>{
  console.log(error);
}) 
});

router.post('/:Dish_ID',async function(req, res){
  var body= req.body;
  console.log(req.body)
  Menu.findOneAndUpdate({"Dish_ID": req.params.Dish_ID},{
    "Dish_Name":body.DishName,
    "Ingredients":body.MainIngredients,
    "Dish_Category":body.DishCategory,
    "Dish_Description":body.DishDescription,
    "Dish_Cost":body.DishCost
  }).exec().then(doc=>{
    console.log("Success aaa"+ doc[0])
    res.send("Success");
  }).catch(error=>{console.log(error+"iii")})
});
  
 
 router.post('/',async function(req, res){
  var body= req.body;
  console.log(body.RestID +'mmm')
  const menu= new Menu({
    "Dish_Name":body.DishName, 
    "Ingredients":body.MainIngredients,
    "Dish_Category": body.DishCategory, 
    "Dish_Description":body.DishDescription, 
    "Dish_Cost":body.DishCost, 
    "Restaurant_ID":body.RestID, 
    "Dish_Type":body.DishType
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


module.exports= router