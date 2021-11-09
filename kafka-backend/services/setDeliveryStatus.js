var Order = require('../Models/OrderModels')

function handle_request(msg, callback){
    Order.findOneAndUpdate({"Order_ID":msg.OrderID},{
        "Delivery_Status": msg.DeliveryStatus
      })
      .exec().then(doc=>{
        let res={
            message: "Success",
            product: doc[0]
        }
        callback(null, res);
        //console.log("Success aaa"+ doc[0])
       // res.send("Success");
      }).catch(error=>{console.log(error+"iii")})
      
    
}
exports.handle_request = handle_request;