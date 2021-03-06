import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import backendurl from "../url";
//===========RESTAURANT LOGIN


export const restLogin = createAsyncThunk(
  'users/restlogin', async (input)=>{
  console.log('inside action' + JSON.stringify(input))
  let result = await axios.post(`${backendurl}/user/restlogin`,input)
  console.log(result.status + ' abb');
  if (result.status === 200) {
    console.log("inside if")
    console.log(result.data)
    let data = result.data;
    
    // localStorage.setItem('email', data.Restaurant_Email);
    // localStorage.setItem('password', data.Restaurant_Password);
    return {auth:true, name:data.Restaurant_Name,email: data.Restaurant_Email, password: data.Restaurant_Password, restID:data.Restaurant_ID};
  }else{
    console.log('fail')
    return {auth: false, message: "Invalid credentials"}
  }
})


 //==========RESTAURANT LOGOUT==================================
export const restClear = createAsyncThunk(
    'users/clear',
    async () => {
      return {arg: true}
    }
  )




  export const restSignup = createAsyncThunk(
    'users/restsignup', async(input)=>{
      console.log('inside action')
        const result = await axios.post(`${backendurl}/user/restsignup`,input)

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

 export const restSignupClear = createAsyncThunk(
  'users/clear',
  async () => {
    return {arg: true}
  }
)