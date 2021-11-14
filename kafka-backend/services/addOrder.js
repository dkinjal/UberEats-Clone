var Order = require('../Models/OrderModels')
const mongoose = require('mongoose');

function handle_request(msg, callback) {
  console.log("msg=  " ,msg)
//var body= msg;
  // console.log(body.Restaurant_ID +'mmm')
  // var today = new Date();
  // console.log(today)
  //   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  //   console.log(date)
  //   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // for (let i = 0; i < msg.length(); i++) {
  //   body = msg[i];
  // }
  // const order = new Order({
  //   "Order_ID": mongoose.Types.ObjectId(),
  //   "Dish_Count":body.DishCount,
  //   "Dish_Name":body.DishName, 
  //   "Delivery_Status":body.DeliveryStatus, 
  //   "Order_Status":body.OrderStatus,
  //   "Restaurant_ID": body.RestID, 
  //   "Order_Mode":body.OrderMode,
  //   "Cust_ID": body.CustID, 
  //   "Dish_Cost":body.DishCost, 
  //   "Order_Time": date + time,
  //   "Special_Instructions": body.SpecialInstructions
    
  // })
  console.log(msg[0].Order_Time+' alalalalalal    ')
  const order = new Order({
    "Order_Details": JSON.stringify(msg),
    "Order_ID": mongoose.Types.ObjectId(),
    "Cust_ID": msg[0].CustID,
    "Cust_Name":msg[0].CustName,
    "Restaurant_ID": msg[0].RestID,
    "Delivery_Status": msg[0].DeliveryStatus,
    "Order_Mode": msg[0].OrderMode,
    "Order_Time": msg[0].Order_Time,
    "Order_Status": msg[0].OrderStatus,
    "Special_Instructions": msg[0].SpecialInstructions,
    "Rest_Name": msg[0].RestName,
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