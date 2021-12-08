const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const OrderType = new GraphQLObjectType({
  name: "Order",
    fields: () => ({
        Cust_ID:{ type: GraphQLString },
        Dish_Count:{ type: GraphQLString },
        Dish_Name:{ type: GraphQLString },
        Delivery_Status:{ type: GraphQLString },
        Order_Status:{ type: GraphQLString },
        Restaurant_ID:{ type: GraphQLString },
        Order_Mode:{ type: GraphQLString },
        Dish_Cost:{ type: GraphQLString },
        Order_ID:{ type: GraphQLString },
      Order_Time: { type: GraphQLString },
      
  }),
});

module.exports = OrderType;