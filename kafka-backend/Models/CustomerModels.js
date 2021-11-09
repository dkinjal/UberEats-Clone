const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var customerSchema = new Schema({
    CustID:{type: String, required:true},
    Cust_Name: { type:String, required:true},
    Cust_DOB: { type:String},
    Cust_City: { type:String},
    Cust_State: { type:String},
    Cust_Street: { type:String},
    Cust_Country: { type:String},
    Cust_Nickname: { type:String},
    Cust_Email: { type:String},
    Cust_Phone: { type:String},
    Cust_Profile_Location: { type:String},
    Cust_Password: { type:String, required:true}
},{
    versionKey: false
})

const custModel = mongoose.model('customer', customerSchema);
module.exports = custModel;