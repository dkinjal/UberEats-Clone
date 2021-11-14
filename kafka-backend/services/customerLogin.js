const Customer= require('../Models/CustomerModels');
const bcrypt = require('bcryptjs');


function handle_request(msg, callback) {
    const email = msg.email;
    const password = msg.password;
    Customer.findOne({ "Cust_Email": email }).exec().then(doc => {
        console.log(doc + "userroute 67");
        bcrypt.compare(password, doc.Cust_Password, (err, response) => {
            if (response) {
                callback(null, doc);
            } else {
                
                callback(null, "Error");
            }
        });
    });
}

exports.handle_request = handle_request;