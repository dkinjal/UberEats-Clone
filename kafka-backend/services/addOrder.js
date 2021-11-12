var Order = require('../Models/OrderModels')
const mongoose = require('mongoose');

function handle_request(msg, callback){
var body= msg;
  console.log(body.Restaurant_ID +'mmm')
  var today = new Date();
  console.log(today)
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(date)
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  const order = new Order({
    "Order_ID": mongoose.Types.ObjectId(),
    "Dish_Count":body.DishCount,
    "Dish_Name":body.DishName, 
    "Delivery_Status":body.DeliveryStatus, 
    "Order_Status":body.OrderStatus,
    "Restaurant_ID": body.RestID, 
    "Order_Mode":body.OrderMode,
    "Cust_ID": body.CustID, 
    "Dish_Cost":body.DishCost, 
    "Order_Time": date+time
    
  })
  order.save().then(result=>{
    console.log(result)
    let res={
        message: "Success",
        product: order
    }
    callback(null, res);
  })
  .catch(error=>{
    console.log(error)
  });
//   res.status(200).json({
//     message: "Success",
//     product: menu
//   })

}
exports.handle_request = handle_request;