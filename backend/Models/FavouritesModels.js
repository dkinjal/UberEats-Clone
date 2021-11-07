const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favouritesSchema = new Schema({
    Cust_ID: { type: String, required: true},
    Restaurant_ID: { type: String, required: true}
},{
    versionKey: false
})

const favModel = mongoose.model('favourites', favouritesSchema);
module.exports = favModel;