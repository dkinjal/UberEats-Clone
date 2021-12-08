var constants = require("./config.json")
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport =  require('passport')
const passportLocal = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { query } = require("express");
const cors =require('cors');
const corsConfig ={
    credentials: true,
    origin: true
}

const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas/index");






const Customer= require('./Models/CustomerModels');

const { mongoDB } = require('./config');
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


app.get('/aaa', (req, res) => {
  Customer.find({}, (error, result) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();
      }
      else {
          res.writeHead(200, {
              'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(result));
      }
  });
});

app.use(cors({
  origin:"http://localhost:3000",
  credentials: true,
  methods:["GET","POST"]
}))

// app.use(cors(corsConfig))
//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'cmpe_273_secure_string',
    resave: false,
    saveUninitialized: true,
    cookie:{
      expires:60*60*1,
    }
}));

// app.use(function (req, res, next){
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT');
//   res.setHeader('Access-Control-Allow-Headers','GET,HEAD,POST,PUT')
// })

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});





app.use(cookieParser("cmpe_273_secure_string"));
//require("./passportConfig")(passport);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);



var connection = mysql.createPool(
    {
      host:  constants.DB.host,
      user: constants.DB.username,
      password: constants.DB.password,
      port: constants.DB.port,
      database: constants.DB.database
    }
  );

  connection.getConnection((err) => {
    if(err){
      throw 'Error occurred' + err;
    }
    console.log('pool created');
  });

//Routes
  // app.post("/login",(req,res)=>{
  //   console.log(req.body)
  // })
  
  // app.post("/register",(req,res)=>{
  //   console.log(req.body)
  // })
  
  // app.get("/user",(req,res)=>{
  //   console.log(req.body)
  // })

  var customer = require('./routes/CustomerRoute')
  app.use('/customer', customer);

  var favourites = require('./routes/FavouritesRoute')
  app.use('/favourites', favourites);

  var restaurant =  require('./routes/RestaurantRoute')
  app.use('/restaurant', restaurant);

  var order =  require('./routes/OrderRoute')
  app.use('/order', order);

  var user =  require('./routes/UserRoute')
  app.use('/user', user);

  var profile = require( './routes/ImageRoute' );
  app.use( '/profile', profile );

  var search = require( './routes/SearchRoute' );
  app.use( '/search', search );

  var dish = require( './routes/DishRoute' );
  app.use( '/dish', dish );
  
  app.listen(4001, ()=>{
    console.log('Sever listening on 4001');
    });


  module.exports={app,connection};