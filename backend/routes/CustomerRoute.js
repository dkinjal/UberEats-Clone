var mysql = require('mysql');
const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection= db.connection;
const Customer= require('../Models/CustomerModels');


//getCustomerDetails 
router.get('/:customer_ID',async function(req, res){
  console.log("id"+req.params.customer_ID)
    Customer.find({"Cust_ID": req.params.customer_ID}).exec().then(doc=>{
          //req.session.user= res;
          //console.log(doc[0].Cust_Name);
          console.log(doc);
          res.status(200).json({
            message: "Success",
            product: doc[0]
          })
      }).catch (error=>{
        console.log(error);
      }) 
});


// getDetailsbyID = (Cust_ID) => {
//   return new Promise((resolve, reject) => {
//     var query = "Select * from CUSTOMER_DETAILS where Cust_ID = " + Cust_ID;
//     connection.query(query, (err, results) => {
//       if (err) return reject(err);
//       return resolve(results);
//     });
//   });
// };

//updateCustomerDetails
router.post("/:CustID", async function (req, res) {
  console.log('inside cust update'+ req.body.Cust_ID)
  
Customer.findOneAndUpdate({"Cust_ID": req.body.Cust_ID},{
  "Cust_Name":req.body.Cust_Name,
  "Cust_DOB":req.body.Cust_DOB,
  "Cust_City":req.body.Cust_City,
  "Cust_State":req.body.Cust_State,
  "Cust_Country":req.body.Cust_Country,
  "Cust_Nickname":req.body.Cust_Nickname,
  "Cust_Phone":req.body.Cust_Phone,
  "Cust_Email": req.body.Cust_Email
})
.exec().then(doc=>{
  console.log("Success aaa"+ doc[0])
  res.send("Success");
}).catch(error=>{console.log(error+"iii")})
});


//addCustomerDetails
router.post("/", async function (req, res) {
  var body = req.body;
  console.log(req.body);
  
  const customer= new Customer({
    "Cust_Name":body.Cust_Name,
    "Cust_DOB":body.Cust_DOB,
    "Cust_City":body.Cust_City,
    "Cust_State":body.Cust_State,
    "Cust_Country":body.Cust_Country,
    "Cust_Nickname":body.Cust_Nickname,
    "Cust_Email":body.Cust_Email,
    "Cust_Phone":body.Cust_Phone,
    "Cust_ID":body.Cust_ID
  })
  customer.save().then(result=>{
    console.log(result)
  })
  .catch(error=>{
    console.log(error)
  });
  res.status(200).json({
    message: "Success",
    product: customer
  })
})
  

  

module.exports= router
  