

export const GET_RESTAURANT = `
  query($id :String!){
  getRestaurantByID(id:$id){
    Restaurant_Name,
    Restaurant_Email,
    Restaurant_Cuisine,
    Restaurant_Day_From,
    Restaurant_Location,
    Restaurant_Contact
  }
}
`;

export const GET_ALL_RESTAURANT = `
query{
  getAllRestaurants{
    Restaurant_Name,
    Restaurant_Email,
    Restaurant_Cuisine,
    Restaurant_Day_From,
    Restaurant_Location,
    Restaurant_Contact
  }
}
`
export const GET_ALL_CUST = `
query{
  getAllCustomers{
    Cust_Name,
    Cust_Country,
    Cust_DOB,
    Cust_City,
    Cust_State,
    Cust_Street,
    Cust_Country,
    Cust_Nickname,
    Cust_Email,
    Cust_Phone
  }
}
`
export const GET_CUST_BY_ID = `
  query($id :String!){
  getCustByID(id:$id){
    Cust_Name,
    Cust_Country,
    Cust_DOB,
    Cust_City,
    Cust_State,
    Cust_Street,
    Cust_Country,
    Cust_Nickname,
    Cust_Email,
    Cust_Phone
  }
}
`;

export const GET_DISH_BY_ID = `
  query($id :String!){
  getMenuByID(id:$id){
    Dish_ID,
    Dish_Name,
    Ingredients,
    Dish_Description,
    Dish_Category,
    Dish_Cost,
    Restaurant_ID,
    Dish_Image_Location,
    Dish_Type
  }
}
`;



