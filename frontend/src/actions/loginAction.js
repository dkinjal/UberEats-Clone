import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import backendurl from "../url";
//================LOGIN======================================
export const login = createAsyncThunk(
    'users/login', async (input)=>{
      console.log('login action 7'+ input.email)
      
      let  result = await axios.post(`${backendurl}/user/login`,input)
      //axios.post(`${backendurl}/user/login`,input).then(result=>{
      console.log(JSON.stringify(result.status) +" aa login action 9");
      //return {auth:true}
      if(result.status===200){
        let data = result.data;
        console.log(data)
        console.log('success login action 15')
        return {auth:true, email:data.Cust_Email, password: data.Cust_Password, custID: data.Cust_ID, token: data.token, Cust_ID: data.Cust_ID};
        // return {auth:true}
      }else{
        console.log('login action fail')
        return {auth: false, message: "Invalid credential"}
      }
 })
    //})
//===========LOGOUT============================================

export const clear = createAsyncThunk(
    'users/clear',
    async () => {
      return {arg: true}
    }
)

  //==============SIGNUP=============================================
  export const custSignup = createAsyncThunk(
    'users/custsignup', async(input)=>{
      console.log('inside action')
      //const result = await axios.post(`${backendurl}/user/signup`,input)
      axios.post(`${backendurl}/user/login`,input).then(result=>{
      console.log(result);
      if(result.status===200){
        let data = result.data[0];
        console.log('inside 200' + data) 
        localStorage.setItem('signup', "success");
        return {auth:true};
      }else{
        console.log('fail')
        localStorage.setItem('signup', "fail");
        return {auth: false, message: "Cannot sign in"}
      }
 })
    })
 export const custSignupClear = createAsyncThunk(
  'users/clear',
  async () => {
    return {arg: true}
  }
)