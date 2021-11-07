const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    Restaurant_ID:{type: String, required:true},
    Restaurant_Email :{ type:String, required:true},
    Restaurant_Name:{ type:String, required:true},
    Restaurant_Description:{ type:String},
    Restaurant_Type:{ type:String},
    Restaurant_Time_From:{ type:String},
    Restaurant_Time_To:{ type:String},
    Restaurant_Delivery_Mode:{ type:String},
    Restaurant_Cuisine:{ type:String},
    Restaurant_Password:{ type:String},
    Restaurant_Day_From:{ type:String},
    Restaurant_Day_To:{ type:String},
    Restaurant_Location:{ type:String},
    Restaurant_Profile_Location:{ type:String},
    Restaurant_Contact:{ type:String}

},{
    versionKey: false
})

const restModel = mongoose.model('restaurant', restaurantSchema);
module.exports = restModel;