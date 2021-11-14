
var constants= require('../config.json')
var mysql = require('mysql');
const express = require("express");
var router = express.Router();
var db = require("../dbConnection");
//var connection= db.connection;
const Favourite= require('../Models/FavouritesModels')
var kafka = require('../kafka/client')
const { auth, checkAuth, checkAuthRest } = require('../Utils/passport');


//router.get('/:customer_ID',async function(req, res){
  router.get('/',async function(req, res){

  kafka.make_request('get_fav',req.body, function(err,results){
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
  
            res.end();
        }
    
  });
    // Favourite.find({"Cust_ID": req.params.customer_ID}).exec().then(doc=>{
    //       //req.session.user= res;
    //       res.status(200).json({
    //         message: "Success",
    //         product: doc[0]
    //       })
    //   }).catch (error=>{
    //     console.log(error);
    //   }) 
      
    });


    router.post('/',async function(req, res){
      kafka.make_request('add_fav',req.body, function(err,results){
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
      
                res.end();
            }
        
      });
        });

    module.exports= router