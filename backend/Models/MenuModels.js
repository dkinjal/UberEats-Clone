const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var menuSchema = new Schema({
    Dish_ID:{ type:String},
    Dish_Name:{ type:String},
    Ingredients:{ type:String},
    Dish_Description:{ type:String},
    Dish_Category:{ type:String},
    Dish_Cost:{ type:String},
    Restaurant_ID:{ type:String},
    Dish_Image_Location:{ type:String},
    Dish_Type:{ type:String}
},{
    versionKey: false
})

const menuModel = mongoose.model('menu', menuSchema);
module.exports = menuModel;