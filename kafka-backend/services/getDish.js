var Menu = require('../Models/MenuModels');

function handle_request(msg, callback){
    console.log("In handle request of post user:"+ JSON.stringify(msg));
    Menu.find({"Dish_ID": msg.Dish_ID}).exec().then(doc=>{
        
        let res={
            message: "Success",
            product: doc[0]
        }
        callback(null, res);
    }).catch (error=>{
      console.log(error);
    })
    
}
exports.handle_request = handle_request;