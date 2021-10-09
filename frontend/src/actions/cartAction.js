import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const addToCart = createAsyncThunk(
    'users/cart', async(input)=>{
      console.log('inside cart action'+ input.DishID)
        localStorage.setItem('DishID', input);
        
        return {auth:true, DishID:input.DishID, DishName: input.DishName, DishCost: input.DishCost, RestID: input.RestID};
      
 })
