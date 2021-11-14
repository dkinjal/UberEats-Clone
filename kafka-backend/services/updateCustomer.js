var Customer = require('../Models/CustomerModels');

function handle_request(msg, callback) {
    console.log(msg.Cust_ID + "aaaaaaaaa")
    console.log(msg)
    Customer.updateOne({ "CustID": msg.Cust_ID }, {
        "Cust_Name":msg.Cust_Name,
        "Cust_DOB":msg.Cust_DOB,
        "Cust_City":msg.Cust_City,
        "Cust_State":msg.Cust_State,
        "Cust_Country":msg.Cust_Country,
        "Cust_Nickname":msg.Cust_Nickname,
        "Cust_Phone":msg.Cust_Phone,
        "Cust_Email": msg.Cust_Email
    }).exec().then(doc => {
        console.log("Success aaa"+ doc)
        // res.send("Success");
        let res={
            message: "Success",
            product: JSON.stringify(doc)
        }
        console.log(res)
        callback(null, res);
    }).catch(error => {
        console.log(error + "iii")
        callback(error, "Error");
    })
}
exports.handle_request = handle_request;