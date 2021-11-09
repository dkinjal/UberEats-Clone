const Favourite= require('../Models/FavouritesModels')

function handle_request(msg, callback){
    Favourite.find({"Cust_ID": msg.customer_ID}).exec().then(doc=>{
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