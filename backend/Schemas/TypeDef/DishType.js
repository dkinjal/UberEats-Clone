const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const DishType = new GraphQLObjectType({
  name: "Dish",
    fields: () => ({
    Dish_ID:{ type: GraphQLString },
    Dish_Name:{ type: GraphQLString },
    Ingredients:{ type: GraphQLString },
    Dish_Description:{ type: GraphQLString },
    Dish_Category:{ type: GraphQLString },
    Dish_Cost:{ type: GraphQLString },
    Restaurant_ID:{ type: GraphQLString },
    Dish_Image_Location:{ type: GraphQLString },
    Dish_Type:{ type: GraphQLString },
    
  }),
});

module.exports = DishType;