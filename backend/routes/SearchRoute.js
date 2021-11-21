const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection = db.connection;
var Restaurant = require('../Models/RestaurantModels');
var Menu = require('../Models/MenuModels')
const { auth, checkAuth, checkAuthRest } = require('../Utils/passport');


router.get('/:searchvalue',async function(req, res){
 
  console.log(req.params.searchvalue)
  Restaurant.find({
    $or: [{
      Restaurant_Location: req.params.searchvalue
    }, {
      Restaurant_Name : req.params.searchvalue
      }, {
      Restaurant_Cuisine: req.params.searchvalue
    }]
  }).collation( { locale: 'en', strength: 2 } )
.then(doc=>{
  //req.session.user= res;
  console.log(doc)
  if (doc == '') {
    console.log('in else for dish search---')
    Menu.find({ Dish_Name: req.params.searchvalue }).collation( { locale: 'en', strength: 2 } ).then(doc => {
      console.log(doc+'dish name')
      var ids = doc.map(function (doc) { return doc.Restaurant_ID; });
      console.log(ids + '____________')
      Restaurant.find({ Restaurant_ID: { $in: ids } }, function (err, doc) {
        console.log(JSON.stringify(doc) + '-------------------------------')
        res.status(200).json({
          message: "Success",
          product: JSON.stringify(doc)
        })
      })
}).catch (error=>{
  console.log(error);
}) 
  } else {
    res.status(200).json({
      message: "Success",
      product: JSON.stringify(doc)
    })
  }
}).catch (error=>{
  console.log(error);
}) 


    // await connection.query(sql_query, async function(error, results){
    //   console.log(error, results)
    //   if(error){
    //     res.writeHead(200, {
    //       'Content-Type':'text/plain'
    //     });
    //     res.end(error.code)
    //   }else{
    //     console.log('here')
    //     res.end(JSON.stringify(results))
    //   }
    // });
  });

router.post('/filter/:searchvalue',async function(req, res){

  console.log(req.body.search+ req.body.delivery_type+'""""""""""""""""""""""""""""""""""')
  Restaurant.find({
    $and: [{
      $or: [
      { Restaurant_Location: req.body.search },
      {Restaurant_Name : req.body.search}
      ]
    }, {
      "Restaurant_Delivery_Mode": req.body.delivery_type
    }]
    
  }).collation( { locale: 'en', strength: 2 } )
.then(doc=>{
    //req.session.user= res;
    console.log(doc)
    res.status(200).json({
      message: "Success",
      product: JSON.stringify(doc)
    })
}).catch (error=>{
  console.log(error);
}) 


    // await connection.query(sql_query, async function(error, results){
    //   console.log(error, results)
    //   if(error){
    //     res.writeHead(200, {
    //       'Content-Type':'text/plain'
    //     });
    //     res.end(error.code)
    //   }else{
    //     console.log('here')
    //     res.end(JSON.stringify(results))
    //   }
    // });
  });

  module.exports= router
