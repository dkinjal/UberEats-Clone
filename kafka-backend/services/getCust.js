var Customer = require('../Models/CustomerModels');

function handle_request(msg, callback) {
  console.log(msg.Cust_ID+"kafka")
    Customer.findOne({"Cust_ID": msg.Cust_ID}).exec().then(doc=>{
          //req.session.user= res;
          //console.log(doc[0].Cust_Name);
          console.log(doc+ "get cust");
        //   res.status(200).json({
        //     message: "Success",
        //     product: JSON.stringify(doc)
        //   })
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