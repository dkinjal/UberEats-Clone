
var constants= require('../config.json')
var mysql = require('mysql');
const express = require("express");
var router = express.Router();
var db = require("../dbConnection");
//var connection= db.connection;
const Favourite= require('../Models/FavouritesModels')

router.get('/:customer_ID',async function(req, res){
    Favourite.find({"Cust_ID": req.params.customer_ID}).exec().then(doc=>{
          //req.session.user= res;
          res.status(200).json({
            message: "Success",
            product: doc[0]
          })
      }).catch (error=>{
        console.log(error);
      }) 
      
    });

    module.exports= router