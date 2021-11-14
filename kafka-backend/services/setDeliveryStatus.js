var Order = require('../Models/OrderModels')

function handle_request(msg, callback) {
  console.log(msg +"     msg")
    Order.findOneAndUpdate({"Order_ID":msg.Order_ID},{
        "Delivery_Status": msg.DeliveryStatus
      })
      .exec().then(doc => {
        console.log(doc)
        let res={
            message: "Success",
            product: doc
        }
        callback(null, res);
        //console.log("Success aaa"+ doc[0])
       // res.send("Success");
      }).catch(error=>{console.log(error+"iii")})
      
    
}
exports.handle_request = handle_request;