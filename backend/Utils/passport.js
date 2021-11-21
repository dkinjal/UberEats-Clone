"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const passport_rest = require("passport");
var { secret } = require("../config");
const Customer = require('../Models/CustomerModels');
const Restaurant = require('../Models/RestaurantModels');

// Setup work and export for the JWT passport strategy
function auth() {
    console.log("inside auth")
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            console.log("okok"+ JSON.stringify(jwt_payload))
            const user_id = jwt_payload._id;
            console.log(user_id+'-----------------------------')
            Customer.findById(user_id, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    console.log(results)
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}

function rest_auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport_rest.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload._id;
            Restaurant.findById(user_id, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}



exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
exports.checkAuthRest = passport_rest.authenticate("jwt_rest", { session: false })


