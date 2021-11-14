const Order = require('../Models/OrderModels')

function handle_request(msg, callback) {
    Order.find({"Cust_ID":msg.Cust_ID}).exec().then(doc=>{
        //req.session.user= res;
        // res.status(200).json({
        //   message: "Success",
        //   product: doc[0]
        // })
        let res ={
            message: "Success",
            product: doc[0]
        }
        callback(null, res);
    }).catch (error=>{
      console.log(error);
    })


}
exports.handle_request = handle_request;