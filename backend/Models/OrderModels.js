const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema = new Schema({
    Cust_ID:{ type:String},
    Dish_Count:{ type:String},
    Dish_Name:{ type:String},
    Delivery_Status:{ type:String},
    Order_Status:{ type:String},
    Restaurant_ID:{ type:String},
    Order_Mode:{ type:String},
    Dish_Cost:{ type:String},
    Order_ID:{ type:String},
    Order_Time:{ type:String}
},{
    versionKey: false
})

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;