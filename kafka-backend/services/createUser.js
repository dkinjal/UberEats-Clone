
var bcrypt = require('bcrypt');
const saltRounds=10;
const mongoose = require('mongoose');
const Customer= require('../Models/CustomerModels');

function handle_request(msg, callback){
    console.log("In handle request of post user:"+ JSON.stringify(msg));
    const name = msg.name;
    const password = msg.password;
    const email = msg.email;
    bcrypt.hash(password, saltRounds, (err, hash)=>{
        const customer= new Customer({
            CustID: mongoose.Types.ObjectId(),
            Cust_Email : email,
            Cust_Password: hash,
            Cust_Name: name
    })
    customer.save().then(result=>{
        console.log(result + "save result")
    }).catch(error=>{
        console.log(error+" save fail")
    });
    let res ={
        message: "Success",
        product: customer
    }
    callback(null, res);
    //   res.status(200).json({
    //     message: "Success",
    //     product: customer
    //   })
    })
}
exports.handle_request = handle_request;