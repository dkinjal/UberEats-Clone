const Restaurant = require('../Models/RestaurantModels.js');
const bcrypt = require('bcryptjs');

function handle_request(msg, callback) {
    const email = msg.email;
    const password = msg.password;
    console.log(email, password)
    Restaurant.findOne({ "Restaurant_Email": email }).exec().then(doc => {
        console.log(doc+"===========");
        bcrypt.compare(password, doc.Restaurant_Password, (err, response) => {
            if (response) {
                console.log('success' + response)
                //req.session.user= res;
                callback(null, doc);
            } else {
                console.log(err + "kkk")
                callback(error, "Error");
            }
        });
    })
}

exports.handle_request = handle_request;
