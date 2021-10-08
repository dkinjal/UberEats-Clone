import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//================LOGIN======================================
export const login = createAsyncThunk(
    'users/login', async(input)=>{
      console.log('inside action')
      const result = await axios.post('http://localhost:4001/user/login',input)
      console.log(result.status);
      if(result.status===200){
        let data = result.data[0];
        localStorage.setItem('email', data.Cust_Email);
        localStorage.setItem('password', data.Cust_Password);
        return {auth:true, email:data.Cust_Email, password: data.Cust_Password};
      }else{
        console.log('fail')
        return {auth: false, message: "Invalid credential"}
      }
 })

//===========LOGOUT============================================

export const clear = createAsyncThunk(
    'users/clear',
    async () => {
      window.location.href="/login";
      return {arg: true}

    }
  )


  //==============SIGNUP=============================================
  export const custSignup = createAsyncThunk(
    'users/custsignup', async(input)=>{
      console.log('inside action')
      const result = await axios.post('http://localhost:4001/user/signup',input)
      console.log(result.status);
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

 export const custSignupClear = createAsyncThunk(
  'users/clear',
  async () => {
    return {arg: true}
  }
)