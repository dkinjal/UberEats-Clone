const mysql = require('mysql');
const constants = require("./config.json")

var connection = mysql.createPool(
    {
      host:  constants.DB.host,
      user: constants.DB.username,
      password: constants.DB.password,
      port: constants.DB.port,
      database: constants.DB.database
    }
  );

  module.exports={connection};