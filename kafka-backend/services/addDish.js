var Menu = require('../Models/MenuModels');
const mongoose = require('mongoose');

function handle_request(msg, callback){
var body= msg;
  console.log(body.RestID +'mmm')
  const menu= new Menu({
    "Dish_Name":body.DishName, 
    "Ingredients":body.MainIngredients,
    "Dish_Category": body.DishCategory, 
    "Dish_Description":body.DishDescription, 
    "Dish_Cost":body.DishCost, 
    "Restaurant_ID":body.RestID, 
    "Dish_Type": body.DishType,
    "Dish_ID": mongoose.Types.ObjectId()
  })
  menu.save().then(result=>{
    console.log(result)
    let res={
        message: "Success",
        product: menu
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