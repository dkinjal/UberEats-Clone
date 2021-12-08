var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
var createUser = require('./services/createUser.js');
var getUser = require('./services/customerLogin');
var getDish = require('./services/getDish');
var addDish = require('./services/addDish');
var getFav = require('./services/getFav');
var addFav = require('./services/addFav');
var updateDeliveryStatus = require('./services/setDeliveryStatus');
var addOrder = require('./services/addOrder')
var custLogin = require('./services/customerLogin');
var restLogin = require('./services/restLogin');
var updateCust = require('./services/updateCustomer');
var getCust = require('./services/getCust');

const { mongoDB } = require('../backend/config');
const mongoose = require('mongoose');
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // poolSize: 500,
  // bufferMaxEntries: 0
};
mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
  });
function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    console.log(topic_name+'11');
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book",Books)
handleTopicRequest("post_user",createUser);
handleTopicRequest("get_user",getUser);
handleTopicRequest("get_dish", getDish);
handleTopicRequest("add_dish", addDish);
handleTopicRequest("get_fav", getFav);
// handleTopicRequest("get_cust", getCust);
// handleTopicRequest("add_fav", addFav);
// handleTopicRequest("add_order", addOrder);
handleTopicRequest("cust_login", custLogin);
handleTopicRequest("rest_login", restLogin);
// handleTopicRequest("update_cust", updateCust);
// handleTopicRequest("update_delivery_status", updateDeliveryStatus);



