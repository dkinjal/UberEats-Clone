const Favourite = require('../Models/FavouritesModels')
const Restaurant = require('../Models/RestaurantModels')

function handle_request(msg, callback) {
    
    console.log('--------------------' + msg + '----------------------')


    Favourite.find({"Cust_ID": msg}, function(err, docs) {
        console.log(docs+'///////////////////////')
        // Map the docs into an array of just the _ids
        var ids = docs.map(function(doc) { return doc.Restaurant_ID; });
        console.log(ids+'____________')
        // Get the companies whose founders are in that set.
        Restaurant.find({ Restaurant_ID: { $in: ids } }, function (err, doc) {
            console.log(JSON.stringify(doc) + '-------------------------------')
            callback(null, (doc))
            // docs contains your answer
        });
    });





    // Favourite.find({ "Cust_ID": msg }).exec().then(doc => {
    //     console.log(JSON.stringify(doc)+'-------------------------------')
    //     //req.session.user= res;
    //     // res.status(200).json({
    //     //   message: "Success",
    //     //   product: doc[0]
    //     // })
    //     let res ={
    //         message: "Success",
    //         product: JSON.stringify(doc)
    //     }
    //     callback(null, res);
    // }).catch (error=>{
    //   console.log(error);
    // })

}

exports.handle_request = handle_request;