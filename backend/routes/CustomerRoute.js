var mysql = require('mysql');
const express = require("express");
var router = express.Router();
var db = require('../dbConnection.js')
var connection= db.connection;



//getCustomerDetails 
router.get('/:customer_ID',async function(req, res){
  console.log(req.params.customer_ID)
  await connection.query(
    "SELECT * FROM CUSTOMER_DETAILS WHERE Cust_ID='"+req.params.customer_ID+"'",
    async function (error, results) {
      console.log(error, results)
      if (error) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        console.log(error)
        res.end(error.code);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        console.log('Results:', results)
        res.end(JSON.stringify(results));
      }
    }
  );

  // try {
  //   let results = await getDetailsbyID(
  //     req.params.customer_ID
  //   );
  //   res.writeHead(200, {
  //     "Content-Type": "text/plain",
  //   });
  //   res.end(JSON.stringify(results));
  // } catch (e) {
  //   console.log(e);
  //   res.writeHead(500, {
  //     "Content-Type": "text/plain",
  //   });
  //   res.end("Error");
  // }
});


getDetailsbyID = (Cust_ID) => {
  return new Promise((resolve, reject) => {
    var query = "Select * from CUSTOMER_DETAILS where Cust_ID = " + Cust_ID;
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

//updateCustomerDetails
router.post("/:CustID", async function (req, res) {
  console.log('inside cust  update')
  var customer_name = req.body.Cust_Name;
  var cust_DOB = req.body.Cust_DOB;
  var cust_city = req.body.Cust_City;
  var cust_state = req.body.Cust_State;
  var cust_country = req.body.Cust_Country;
  var cust_nickname = req.body.Cust_Nickname;
  var cust_email = req.body.Cust_Email;
  var cust_phone = req.body.Cust_Phone;
console.log(cust_country+"country")
   connection.query(
    "UPDATE CUSTOMER_DETAILS SET Cust_Name='" +
      customer_name +
      "',Cust_DOB='" +
      cust_DOB +
      "',Cust_City='" +
      cust_city +
      "',Cust_State='" +
      cust_state +
      "',Cust_Country='" +
      cust_country +
      "',Cust_Nickname='" +
      cust_nickname +
      "',Cust_Email='" +
      cust_email +
      "',Cust_Phone='" +
      cust_phone +
      "'WHERE Cust_Id='" +
      req.params.CustID +
      "'",
    async function (error, results) {
      if (error) {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(error.code);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});


//addCustomerDetails
router.post("/", async function (req, res) {
  var body = req.body;
  console.log(req.body);
  const sqlput =
    "INSERT INTO CUSTOMER_DETAILS (Cust_Name, Cust_DOB,Cust_City,Cust_State,Cust_Country,Cust_Nickname,Cust_Email,Cust_Phone, Cust_ID) VALUES (?,?,?,?,?,?,?,?,?)";
  var values = [
    body.Cust_Name,
    body.Cust_DOB,
    body.Cust_City,
    body.Cust_State,
    body.Cust_Country,
    body.Cust_Nickname,
    body.Cust_Email,
    body.Cust_Phone,
    body.Cust_ID
  ];

  await connection.query(sqlput, values, async function (error, results) {
    
    if (error) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(error.code);
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(results));
    }
  });
});
  

module.exports= router
  