import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import backendurl from "../url";

export const getRestDetails = createAsyncThunk(
    'users/rest_get', (input)=>{
      console.log('inside action')
      console.log(input);
        let result =  axios.get(`${backendurl}/restaurant/menu/`,input)

      console.log(result.status + 'abb');
      if(result.status===200){
        let data = result.data[0];
        console.log(data.Restaurant_ID)
        localStorage.setItem('email', data.Restaurant_Email);
        localStorage.setItem('password', data.Restaurant_Password);
        return {auth:true, name:data.Restaurant_Name,email: data.Restaurant_Email, password: data.Restaurant_Password, restID:data.Restaurant_ID};
      }else{
        console.log('fail')
        return {auth: false, message: "Invalid credential"}
      }
 })
