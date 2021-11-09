const Favourite= require('../Models/FavouritesModels')

function handle_request(msg, callback){
var body= msg;
  console.log(body.Restaurant_ID +'mmm')
  const fav= new Favourite({
    "Cust_ID":body.Cust_ID, 
    "Restaurant_ID":body.Restaurant_ID,
    
  })
  fav.save().then(result=>{
    console.log(result)
    let res={
        message: "Success",
        product: fav
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