const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection = db.connection;
var Restaurant = require('../Models/RestaurantModels');
const { auth, checkAuth, checkAuthRest } = require('../Utils/passport');


router.get('/:searchvalue',async function(req, res){
 
  // let sql_query = "SELECT * FROM RESTAURANT_DETAILS WHERE Restaurant_Name LIKE'%" + req.params.searchvalue + "%' OR Restaurant_Cuisine LIKE'%" + req.params.searchvalue + "%' OR RESTAURANT_LOCATION LIKE '%" + req.params.searchvalue + "%'OR RESTAURANT_ID IN(SELECT Restaurant_ID FROM RESTAURANT_MENU WHERE DISH_NAME LIKE '%" + req.params.searchvalue + "%')"
  

  Restaurant.find({
    $or: [{
      Restaurant_Name: req.params.searchvalue
        // { $eq: /$req.params.searchvalue$/ }
    }
      // , { Restaurant_Cuisine: { $exists: true } }
    ]
  }).then(doc=>{
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
