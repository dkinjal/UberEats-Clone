var constants= require('../config.json')
var mysql = require('mysql');
const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection= db.connection;
var Order = require('../Models/OrderModels')
var kafka = require('../kafka/client')
const { auth, checkAuth, checkAuthRest } = require('../Utils/passport');

//addOrder

router.get('/rest/:RestID', function (req, res) {
  Order.find({"Restaurant_ID": req.params.RestID}).exec().then(doc=>{
    //req.session.user= res;
    console.log(doc)
    res.status(200).json({
      message: "Success",
      product: JSON.stringify(doc)
    })
}).catch (error=>{
  console.log(error);
}) 
  // Order.find({""})
  //  connection.query("SELECT * , CUST_NAME, SUM(ORDER_DETAILS.Dish_Count) AS DishCount, SUM(ORDER_DETAILS.Dish_Cost) AS DishCost2 FROM ORDER_DETAILS, CUSTOMER_DETAILS WHERE Restaurant_ID='"+req.params.RestID+"' AND ORDER_DETAILS.Cust_ID= CUSTOMER_DETAILS.Cust_ID GROUP BY  ORDER_DETAILS.Order_ID ", async function(error, results){
  //   console.log(error, results,'aaaa')
  //   if(error){
  //     res.end(error.code)
  //   }else{
  //     console.log(results)
  //     res.end(JSON.stringify(results))
  //   }
  });



router.get('/:Cust_ID',async function(req, res){
    //console.log(req)
    //console.log(res)
    // query="SELECT *, SUM(Dish_Count) AS Quantity FROM ORDER_DETAILS, RESTAURANT_DETAILS WHERE CUST_ID='"+req.params.Cust_ID+"'AND RESTAURANT_DETAILS.Restaurant_ID= ORDER_DETAILS.Restaurant_ID GROUP BY ORDER_ID"
    Order.find({"Cust_ID": req.params.Cust_ID}).exec().then(doc=>{
    //req.session.user= res;
    console.log("doc    "+doc)
    res.status(200).json({
      message: "Success",
      product: JSON.stringify(doc)
    })
    }).catch (error=>{
      console.log(error);
    }) 
      // await connection.query(query, async function(error, results){
      //   if(error){
      //     res.writeHead(200, {
      //       'Content-Type':'text/plain'
      //     });
      //     res.end(error.code)
      //   }else{
      //     res.writeHead(200, {
      //       'Content-Type':'text/plain'
      //     });
      //     console.log("success")
      //     console.log(JSON.stringify(results))
      //     res.end(JSON.stringify(results))
      //   }
      // });
    });



//router.post('/update1/:OrderID',async function(req, res){
  router.post('/update1/:OrderID',async function(req, res){
  var body= req.body;
  console.log('update delivery status kkkkk'+ body)
  //const sqlput = "UPDATE ORDER_DETAILS SET Delivery_Status=? where Order_ID=?";
  //var values=[body.DeliveryStatus,req.params.OrderID]
  //console.log(values)
  // Order.findOneAndUpdate({"Order_id":req.params.OrderID},{
  //   "Delivery_Status": body.DeliveryStatus
  // })
  // .exec().then(doc=>{
  //   console.log("Success aaa"+ doc[0])
  //   res.send("Success");
  // }).catch(error=>{console.log(error+"iii")})
  // });
  kafka.make_request('update_delivery_status',req.body, function(err,results){
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
      })
  // connection.query(sqlput, values, async function(error, results){
  //   if(error){
  //     res.writeHead(200, {
  //       'Content-Type':'text/plain'
  //     });
  //     res.end(error.code)
  //   }else{
  //     res.writeHead(200, {
  //       'Content-Type':'text/plain'
  //     });
  //     res.end(JSON.stringify(results))
  //   }
  // });
});

router.post('/special',async function(req, res){
  var body = req.body;
  kafka.make_request('update_special_instructions', req.body, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {
      console.log("Inside else");
      res.json({
        updatedList: results
    });
  
    res.end();
    }
  })
})
  
router.post('/',async function(req, res){
  // var lastRow="SELECT ORDER_ID FROM ORDER_DETAILS ORDER BY ORDER_id DESC LIMIT 1"
  // let last =0;
  // connection.query(lastRow, function(error, results){
  //   if(error){
  //     console.log(error+'aaa')
  //   }else{
  //     console.log(JSON.stringify(results[0])+'aaa')
  //     const row= results[0];
  //     last = row.ORDER_ID;
  //     console.log(last+"lastttt")
  //     var mainbody= req.body;
  //     console.log(mainbody.length+'length')
      
  //     var output=[];
  // console.log(last+"last")
  // for(let q=0; q< mainbody.length; q++){
  //   var today = new Date();
  //   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  //   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // const sqlput = "INSERT INTO ORDER_DETAILS (ORDER_ID,Dish_Count, Dish_Name, Delivery_Status, Order_Status, Restaurant_ID, Order_Mode, Cust_ID, Dish_Cost,Order_Time) VALUES(?,?,?,?,?,?,?,?,?,?)";
  // var body= mainbody[q]
  // var values=[last+1, body.DishCount,body.DishName, body.DeliveryStatus, body.OrderStatus, body.RestID, body.OrderMode, body.CustID, body.DishCost, date+time]
  kafka.make_request('add_order',req.body, function(err,results){
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



//   connection.query(sqlput, values, async function(error, results){
//     if(error){
//       console.log(error+"error ")
      
//       res.send(error.code)
//     }else{
//       console.log('success')
//       output.push(results)
//       console.log(output)
//     }
//   });
// } res.send(output)
// }
// });
})

router.get('/receipt/:orderID', function(req, res){
  console.log('RestID'+ req.params.orderID)
  Order.find({"Order_ID": req.params.orderID}).exec().then(doc=>{
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


    module.exports= router
  