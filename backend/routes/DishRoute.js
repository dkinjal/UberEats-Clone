const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var Menu = require('../Models/MenuModels');
var kafka = require('../kafka/client')

//addOrder

 router.get('/:Dish_ID', function(req, res){
 // router.get('/one', function(req, res){

kafka.make_request('get_dish',req.params.Dish_ID, function(err,results){
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
           res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(results))
            res.end();
        }
    
  });
  // Menu.find({"Dish_ID": req.params.Dish_ID}).exec().then(doc=>{
  //       //req.session.user= res;
  //       res.status(200).json({
  //         message: "Success",
  //         product: doc[0]
  //       })
  //   }).catch (error=>{
  //     console.log(error);
  //   })
});

router.get('/rest/:RestID', function(req, res){
  console.log(req.params.RestID, "nnooon")
  Menu.find({"Restaurant_ID": req.params.RestID}).exec().then(doc=>{
    //req.session.user= res;
    console.log(doc)
    res.status(200).json({
      message: "Success",
      product: JSON.stringify(doc)
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
  kafka.make_request('add_dish',req.body, function(err,results){
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
  console.log(res)
            res.end();
        }
    
  });
    });
  // var body= req.body;
  // console.log(body.RestID +'mmm')
  // const menu= new Menu({
  //   "Dish_Name":body.DishName, 
  //   "Ingredients":body.MainIngredients,
  //   "Dish_Category": body.DishCategory, 
  //   "Dish_Description":body.DishDescription, 
  //   "Dish_Cost":body.DishCost, 
  //   "Restaurant_ID":body.RestID, 
  //   "Dish_Type":body.DishType
  // })
  // menu.save().then(result=>{
  //   console.log(result)
  // })
  // .catch(error=>{
  //   console.log(error)
  // });
  // res.status(200).json({
  //   message: "Success",
  //   product: menu
  // })
  //}); 


module.exports= router