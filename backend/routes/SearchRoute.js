const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection= db.connection;


router.get('/:searchvalue',async function(req, res){
    await connection.query("SELECT * FROM RESTAURANT_DETAILS WHERE Restaurant_Name LIKE'"+req.params.searchvalue+"' OR Restaurant_Cuisine LIKE'"+req.params.searchvalue+"' OR RESTAURANT_ID IN(SELECT Restaurant_ID FROM RESTAURANT_MENU WHERE DISH_NAME LIKE '"+req.params.searchvalue+"')"
    , async function(error, results){
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

  module.exports= router
