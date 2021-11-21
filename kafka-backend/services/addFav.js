const Favourite= require('../Models/FavouritesModels')

function handle_request(msg, callback){
  console.log('inside add to fav ---------------------')
  console.log(msg.Rest_ID +'mmm')
  const fav= new Favourite({
    "Cust_ID":msg.Cust_ID, 
    "Restaurant_ID":msg.Rest_ID,
    
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