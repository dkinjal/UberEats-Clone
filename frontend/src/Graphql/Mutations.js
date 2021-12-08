export const NEW_USER = `
  mutation(
    $Cust_Name: String!,
    $Cust_Email:String!,
    $Cust_Password: String!,
    ){
  createCustomer(
    Cust_Name: $Cust_Name,
    Cust_Email:$Cust_Email,
    Cust_Password: $Cust_Password,
    ){
    Cust_Name
  }
}
`;

export const NEW_ORDER = `
  mutation(
    $Cust_ID: String!,
    $Cust_Name: String!,
    $Restaurant_ID:String!,
    $Delivery_Status: String!,
    $Order_Mode: String!,
    $Order_Time: String!,
    $Dish_Name: String!,
    $Dish_Count: String!,
    $Dish_Cost:String!,
    $Order_Status:String!,
    $Special_Instructions: String!,
    $Rest_Name: String!,
    ){
  addOrder(
    Cust_ID: $Cust_ID,
    Cust_Name: $Cust_Name,
    Restaurant_ID:$Restaurant_ID,
    Delivery_Status: $Delivery_Status,
    Order_Mode: $Order_Mode,
    Order_Time: $Order_Time,
    Dish_Name: $Dish_Name,
    Dish_Count: $Dish_Count,
    Dish_Cost:$Dish_Cost,
    Order_Status:$Order_Status,
    Special_Instructions: $Special_Instructions,
    Rest_Name:$Rest_Name
    ){
    Order_ID
  }
}
`;

export const Update_Delivery = `
  mutation(
    $Order_ID: String!,
    $Delivery_Status:String!,
    
    ){
  updateDeliveryStatus(
    Order_ID: $Order_ID,
    Delivery_Status:$Delivery_Status,
    
    ){
    Delivery_Status
  }
}
`;

export const UPDATE_USER = `
  mutation(
    $Cust_Name: String!,
    $Cust_Country: String!,
    $Cust_DOB: String!,
    $Cust_City:String!,
    $Cust_State:String!,
    $Cust_Street: String!,
    $Cust_Country: String!,
    $Cust_Nickname: String!,
    $Cust_Email:String!,
    $Cust_Phone: String!,
    ){
  createCustomer(
    Cust_Name: $Cust_Name,
    Cust_Country: $Cust_Country,
    Cust_DOB: $Cust_DOB,
    Cust_City:$Cust_City,
    Cust_State:$Cust_State,
    Cust_Street: $Cust_Street,
    Cust_Country: $Cust_Country,
    Cust_Nickname: $Cust_Nickname,
    Cust_Email:$Cust_Email,
    Cust_Phone: $Cust_Phone,
    ){
    Cust_Name,
  }
}
`;

export const ADD_DISH = `
  mutation(
    Dish_Name:String!,
    Ingredients:String!,
    Dish_Description:String!,
    Dish_Category:String!,
    Dish_Cost:String!,
    Restaurant_ID:String!,
    Dish_Type:String!,
    ){
  createCustomer(
    Dish_Name:$Dish_Name,
    Ingredients:$Ingredients,
    Dish_Description:$Dish_Description,
    Dish_Category:$Dish_Category,
    Dish_Category:$Dish_Category,
    Restaurant_ID:$Restaurant_ID,
    Dish_Type:$Dish_Type,
    ){
    Dish_Name
  }
}
`;

export const Update_Restaurant = `
  mutation(
    $Restaurant_ID: String!,
    $Restaurant_Email:String!,
    $Restaurant_Name: String!,
    $Restaurant_Description:String!, 
    $Restaurant_Type:String!,
    $Restaurant_Time_From: String!,
    $Restaurant_Time_To: String!,
    $Restaurant_Delivery_Mode: String!,
    $Restaurant_Cuisine: String!,
    $Restaurant_Day_From: String!,
    $Restaurant_Location: String!,
    $Restaurant_Contact: String!,
    ){
  updateRestaurant(
    Restaurant_ID: Restaurant_ID,
    Restaurant_Email:Restaurant_Email,
    Restaurant_Name: Restaurant_Name,
    Restaurant_Description:Restaurant_Description, 
    Restaurant_Type:Restaurant_Type,
    Restaurant_Time_From: Restaurant_Time_From,
    Restaurant_Time_To: Restaurant_Time_To,
    Restaurant_Delivery_Mode: Restaurant_Delivery_Mode,
    Restaurant_Cuisine: Restaurant_Cuisine,
    Restaurant_Day_From: Restaurant_Day_From,
    Restaurant_Location: Restaurant_Location,
    Restaurant_Contact:Restaurant_Contact
    ){
    Restaurant_Name
  }
}
`;

