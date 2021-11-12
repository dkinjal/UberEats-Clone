import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import backendurl from "../url";

 export const addOrder = createAsyncThunk(
  'order/add', async(input)=>{
    console.log('inside action'+input.Cust_ID);
    const result = await axios.post(`${backendurl}/order`,input)
    console.log(result.status);
    if(result.status===200){
      let data = result.data[0];
      console.log('success login action'+ data)
      return {auth:true, data};
    }else{
      console.log('fail')
      return {auth: false, message: "Couldn't update"}
    }
})