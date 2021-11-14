var Customer = require('../Models/CustomerModels');

function handle_request(msg, callback) {
  console.log(msg+"    kafka")
    Customer.findOne({"CustID": msg}).exec().then(doc=>{
      console.log(doc + "get cust");
        let res={
            message: "Success",
            product: JSON.stringify(doc)
        }
        callback(null, res);
      }).catch (error=>{
        console.log(error);
      }) 

}
exports.handle_request = handle_request;