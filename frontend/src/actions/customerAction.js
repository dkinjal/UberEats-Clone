import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import backendurl from "../url";

export const getCustomer = createAsyncThunk(
  'customers/get', async(input)=>{
    console.log('inside action'+input.Cust_ID);
    const result = await axios.get(`${backendurl}/customer/${input.Cust_ID}`,input)
    console.log(result.status);
    if(result.status===200){
      let data = result.data.product;
      console.log('success getcust action '+ data)
      return {auth:true, data};
    }else{
      console.log('fail')
      return {auth: false, message: "Couldn't update"}
    }
})

export const updateCustomer = createAsyncThunk(
    'customers/update', async(input)=>{
      console.log('inside action'+input.Cust_ID);
      const result = await axios.post(`${backendurl}/customer/${input.CustID}`,input)
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

 export const addCustomer = createAsyncThunk(
  'customers/add', async(input)=>{
    console.log('inside action'+input.Cust_ID);
    const result = await axios.post(`${backendurl}/customer`,input)
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




