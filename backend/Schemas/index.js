const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const mongoose = require('mongoose');

const CustomerType = require('./TypeDef/CustomerType')
const RestaurantType = require('./TypeDef/RestaurantType')
const DishType = require('./TypeDef/OrderType')
const OrderType = require('./TypeDef/OrderType')
const Customer = require('../Models/CustomerModels.js')
const Restaurant = require('../Models/RestaurantModels')
const Menu = require('../Models/MenuModels')
const Order = require('../Models/OrderModels')
const bcrypt = require('bcryptjs');
const saltRounds=10;
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllCustomers: {
    //   type: new GraphQLList( CustomerType),
        type: CustomerType,
        args: {id:{type: GraphQLString} },
          async resolve(parent, args) {
              console.log("args ", args);
                    var doc = await Customer.findOne({Cust_Country: args.id})
                    let res={
                        message: "Success",
                        product: doc
                    }
                    console.log(doc)
                   return doc;
      },
    },
    getAllRestaurants: {
    //   type: new GraphQLList( CustomerType),
        type: RestaurantType,
        args: {id:{type: GraphQLString} },
          async resolve(parent, args) {
              console.log("args ", args);
                    var doc = await Restaurant.findOne({Restaurant_ID: args.id})
                    let res={
                        message: "Success",
                        product: doc
                    }
                    console.log(doc)
                   return doc;
      },
    },
    getRestaurantByID: {
    //   type: new GraphQLList( CustomerType),
        type: RestaurantType,
        args: {id:{type: GraphQLString} },
          async resolve(parent, args) {
              console.log("args==== ", args);
                  var doc = await Restaurant.findOne({Restaurant_ID: args.id})
                  console.log("RESULTS ",doc)
                    return doc;
      },
    },
  },
});


const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createCustomer: {
      type: CustomerType,
      args: {
        
        Cust_Name: { type: GraphQLString },
        Cust_Country: { type: GraphQLString },
        Cust_DOB: { type: GraphQLString },
        Cust_City: { type: GraphQLString },
        Cust_State: { type: GraphQLString },
        Cust_Street: { type: GraphQLString },
        Cust_Country: { type: GraphQLString },
        Cust_Nickname: { type: GraphQLString },
        Cust_Email: { type: GraphQLString },
        Cust_Phone: { type: GraphQLString },
        Cust_Profile_Location: { type: GraphQLString },
            
    },
      resolve(parent, args) {
        const customer = new Customer({"CustID": mongoose.Types.ObjectId(),
        "Cust_Name":args.Cust_Name,
        "Cust_Country": args.Cust_Country,
        "Cust_DOB": args.Cust_DOB,
        "Cust_City": args.Cust_City,
        "Cust_State": args.Cust_State,
        "Cust_Street": args.Cust_Street,
        "Cust_Nickname": args.Cust_Nickname,
        "Cust_Email": args.Cust_Email,
        "Cust_Phone": args.Cust_Phone,
        "Cust_Profile_Location": args.Cust_Profile_Location,
        })
        customer.save().then(doc => {
        console.log(JSON.stringify(doc)+'--------')
        console.log("Success aaa"+ doc)
        return args;
    }).catch(error => {
        console.log(error + "iii")
       
    })
          
      },
    },
    CustomerLogin: {
      type: CustomerType,
      args: {
        Cust_Name: { type: GraphQLString },
        Cust_Email: { type: GraphQLString },
        Cust_Password: { type: GraphQLString },    
    },
      resolve(parent, args) {
        bcrypt.hash(args.Cust_Password, saltRounds, (err, hash) => {
          const customer = new Customer({
            CustID: mongoose.Types.ObjectId(),
            Cust_Email: args.Cust_Email,
            Cust_Password: hash,
            Cust_Name: args.Cust_Name
          })
          customer.save().then(result => {
            console.log(result)
            return result
          })
            .catch(error => {
              console.log(error)
              return error
            });
        })
      },
    },


    updateOrder: {
      type: OrderType,
      args: {
        Order_ID:{ type: GraphQLString },
       Delivery_Status : { type: GraphQLString },
    },
      resolve(parent, args) {
        Order.updateOne({"Order_ID": args.Order_ID }, {
        "Delivery_Status": args.Delivery_Status
        }).exec().then(doc => {
        console.log(JSON.stringify(doc)+'--------')
        console.log("Success aaa"+ doc)
        return args;
    }).catch(error => {
        console.log(error + "iii")
       
    })
          
      },
    },
    updateRestaurant: {
      type: RestaurantType,
      args: {
        Restaurant_ID: {type: GraphQLString},
        Restaurant_Email: { type: GraphQLString },
        Restaurant_Name: { type: GraphQLString },
        Restaurant_Description: { type: GraphQLString },
        Restaurant_Type: { type: GraphQLString },
        Restaurant_Time_From: { type: GraphQLString },
        Restaurant_Time_To: { type: GraphQLString },
        Restaurant_Delivery_Mode: { type: GraphQLString },
        Restaurant_Cuisine: { type: GraphQLString },
        Restaurant_Day_From: { type: GraphQLString },
        Restaurant_Location: { type: GraphQLString },
        
        Restaurant_Contact: { type: GraphQLString },
            
    },
      resolve(parent, args) {
        const restaurant = new Restaurant({
        "Restaurant_ID": args.Restaurant_ID,
        "Restaurant_Email":args.Restaurant_Email,
        "Restaurant_Name": args.Restaurant_Name,
        "Restaurant_Description": args.Restaurant_Description,
        "Restaurant_Type": args.Restaurant_Type,
        "Restaurant_Delivery_Mode": args.Restaurant_Delivery_Mode,
        "Restaurant_Cuisine": args.Restaurant_Cuisine,
        "Restaurant_Location": args.Restaurant_Location,
        "Restaurant_Contact": args.Restaurant_Contact,
        })
           restaurant.save().then(doc => {
        console.log(JSON.stringify(doc)+'--------')
        console.log("Success aaa"+ JSON.stringify(doc)+ args.Restaurant_Name)
        return args;
    }).catch(error => {
        console.log(error + "iii")
       
    })
          
      },
    },

    updateDeliveryStatus: {
      type: OrderType,
      args: {
        Order_ID:{type: GraphQLString},
        Delivery_Status:{type: GraphQLString},
            
    },
      async resolve(parent, args) {
        
        var doc = await Order.findOneAndUpdate({ "Order_id": args.Order_ID }, {
          "Delivery_Status": args.Delivery_Status
        });
        console.log("Success aaa"+ doc.Delivery_Status)
        return doc
        
          
      },
    },

    addDish: {
      type: DishType,
      args: {
        Dish_ID:{ type: GraphQLString },
        Dish_Name:{ type: GraphQLString },
        Ingredients:{ type: GraphQLString },
        Dish_Description:{ type: GraphQLString },
        Dish_Category:{ type: GraphQLString },
        Dish_Cost:{ type: GraphQLString },
        Restaurant_ID:{ type: GraphQLString },
        Dish_Image_Location:{ type: GraphQLString },
        Dish_Type:{ type: GraphQLString },
        
    },
      resolve(parent, args) {
        const menu= new Menu({
            "Dish_Name":args.Dish_Name, 
            "Ingredients":args.Ingredients,
            "Dish_Category": args.Dish_Category, 
            "Dish_Description":args.Dish_Description, 
            "Dish_Cost":args.Dish_Cost, 
            "Restaurant_ID":args.Restaurant_ID, 
            "Dish_Type": args.Dish_Type,
            "Dish_ID": args.Dish_ID
          })
        menu.save().then(result => {
          console.log(result)
          return args.Dish_ID
        })
          .catch(error=>{
            console.log(error)
          });
      },
    },
    addOrder: {
      type: OrderType,
      args: {
        Cust_ID:{ type: GraphQLString },
        Dish_Count:{ type: GraphQLString },
        Dish_Name:{ type: GraphQLString },
        Delivery_Status:{ type: GraphQLString },
        Order_Status:{ type: GraphQLString },
        Restaurant_ID:{ type: GraphQLString },
        Order_Mode:{ type: GraphQLString },
        Dish_Cost:{ type: GraphQLString },
        Order_ID:{ type: GraphQLString },
        Order_Time:{ type: GraphQLString }, 
        
    },
      resolve(parent, args) {
        const order= new Order({
          //  "Order_Details": JSON.stringify(msg),
            "Order_ID": args.Order_ID,
            "Cust_ID": args.Cust_ID,
            "Cust_Name":args.Cust_Name,
            "Restaurant_ID": args.Restaurant_ID,
            "Delivery_Status": args.Delivery_Status,
            "Order_Mode": args.Order_ID,
            "Order_Time": args.Order_Time,
            "Order_Status": args.Order_Status,
          })
        order.save().then(result => {
          console.log(result)
          return args.Order_ID
        })
          .catch(error=>{
            console.log(error)
          });          
      },
    },
  },
});



module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });