
var constants= require('../config.json')
var mysql = require('mysql');
const express = require("express");
var router = express.Router();
var db = require("../dbConnection");
var connection= db.connection;

//
router.get('/:customer_ID',async function(req, res){
    //console.log(req)
    //console.log(res)
      await connection.query("SELECT * FROM RESTAURANT_DETAILS WHERE RESTAURANT_ID IN(SELECT RESTAURANT_ID FROM FAVOURITE_DETAILS WHERE Cust_ID ='"+req.params.customer_ID+"')", async function(error, results){
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

    module.exports= router