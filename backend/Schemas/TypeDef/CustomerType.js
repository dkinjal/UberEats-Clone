const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const CustomerType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    CustID: { type: GraphQLString },
    // Cust_Password:{ type: GraphQLString },
    Cust_Name: { type: GraphQLString },
    Cust_DOB: { type: GraphQLString },
    Cust_City:{ type: GraphQLString },
    Cust_State:{ type: GraphQLString },
    Cust_Street: { type: GraphQLString },
    Cust_Country: { type: GraphQLString },
    Cust_Nickname: { type: GraphQLString },
    Cust_Email: { type: GraphQLString },
    Cust_Phone:{ type: GraphQLString },
    Cust_Profile_Location: { type: GraphQLString }
    
  }),
});

module.exports = CustomerType;