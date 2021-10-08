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
    },
   
    extraReducers:{
        [login.fulfilled] : (state,action) => {
            console.log(action.payload+ 'login reducer')
            if (action.payload.auth){
                state.error = null
                state.pass = true
                state.email = action.payload.email;
                state.password= action.payload.password;
            }
            else {
                console.log("here")
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
            }
            return state;
        }     
    }
});

export default LoginReducer.reducer