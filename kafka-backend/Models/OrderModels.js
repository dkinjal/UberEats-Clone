const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema = new Schema({
    Order_Details: { type: String },
    Order_ID: { type: String },
    Cust_ID: { type: String },
    Cust_Name:{type: String},
    Delivery_Status: { type: String },
    Restaurant_ID: { type: String },
    Rest_Name:{type:String},
    Order_Mode: { type: String },
    Order_Time: { type: String },
    Order_Status: { type: String },
    Special_Instructions:{ type: String },
}, {
    
    versionKey: false
})

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;