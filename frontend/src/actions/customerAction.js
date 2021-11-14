import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import backendurl from "../url";

export const getCustomer = createAsyncThunk(
  'customers/get', async(input,setCustData)=>{
    console.log('inside action'+input.Cust_ID);
    const result = await axios.get(`${backendurl}/customer/${input.Cust_ID}`,input)
    console.log(result.data.product);
    if(result.status===200){
      let data = (result.data.product);
      setCustData(data)
      console.log('success getcust action '+ data)
      return {auth:true,  product: data};
    }else{
      console.log('fail')
      return {auth: false, message: "Couldn't update"}
    }
})

export const updateCustomer = createAsyncThunk(
    'customers/update', async(input, setCustData)=>{
    console.log('inside action' + input.Cust_ID);
    console.log("inside action "+ JSON.stringify(input))
      const result = await axios.post(`${backendurl}/customer/${input.Cust_ID}`,input)
      console.log(result.status);
    if (result.status === 200) {
        console.log(result)
        let data = result.data;
        setCustData(data)
        console.log('success update action'+ JSON.stringify(data))
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




