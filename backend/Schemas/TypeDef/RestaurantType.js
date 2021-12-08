const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const RestaurantType = new GraphQLObjectType({
  name: "Restaurant",
    fields: () => ({
    Restaurant_ID:{ type: GraphQLString },
    Restaurant_Email :{ type: GraphQLString },
    Restaurant_Name:{ type: GraphQLString },
    
    Restaurant_Type:{ type: GraphQLString },
    Restaurant_Time_From:{ type: GraphQLString },
    Restaurant_Time_To:{ type: GraphQLString },
    Restaurant_Delivery_Mode:{ type: GraphQLString },
    Restaurant_Cuisine:{ type: GraphQLString },
    Restaurant_Password:{ type: GraphQLString },
    Restaurant_Day_From:{ type: GraphQLString },
    Restaurant_Day_To:{ type: GraphQLString },
    Restaurant_Location:{ type: GraphQLString },
    Restaurant_Profile_Location:{ type: GraphQLString },
    Restaurant_Contact:{ type: GraphQLString },
    
  }),
});

module.exports = RestaurantType;