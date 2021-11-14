import { createSlice } from '@reduxjs/toolkit';
import {login, clear} from "../actions/loginAction"

//===============CUSTOMER LOGIN REDUCER===================================
export const LoginReducer = createSlice({
    name: "login",
    initialState:{
        email: '',
        password: '',
        error: '',
        pass: '',
        custID:'',
        token: '',
        name:''
    },
   
    extraReducers:{
        [login.fulfilled] : (state,action) => {
            console.log(JSON.stringify(action) + 'login reducer 17')
            if (action.payload.auth){
                state.error = null
                state.pass = true
                console.log(action.payload)
                state.token= action.payload.token
                state.email = action.payload.email;
                state.password= action.payload.password;
                state.custID = action.payload.custID;
                state.name= action.payload.custName
            }
            else {
                console.log("here login reducer 26")
                state.error = "Invalid Credentials"
            }
            //return state;
        },  
        [clear.fulfilled] : (state, action) => {
            if (action.payload.arg){
                state.error = ''
                state.pass = false
                state.password = ''
                state.email=''
                state.custID=''
            }
            return state;
        }     
    }
});

export default LoginReducer.reducer