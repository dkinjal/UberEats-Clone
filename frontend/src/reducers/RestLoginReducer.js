import { createSlice } from '@reduxjs/toolkit';
import {restLogin, restClear} from '../actions/restLoginAction'

//=======================RESTAURANT LOGIN REDUCER===================
export const LoginReducer = createSlice({
    name: "restLogin",
    initialState:{
        email: '',
        password: '',
        name:'',
        error: '',
        pass: '',
    },
   
    extraReducers:{
        [restLogin.fulfilled] : (state,action) => {
            console.log(action.payload.auth+ 'login reducer')
            if (action.payload.auth){
                state.error = null
                state.pass = true
                state.email = action.payload.email;
                state.password= action.payload.password;
                state.name= action.payload.name;
            }
            else {
                console.log("here")
                state.error = "Invalid Credentials"
            }
            //return state;
        },  
        [restClear.fulfilled] : (state, action) => {
            if (action.payload.arg){
                state.error = ''
                state.pass = false
                state.password = ''
                state.email=''
                state.name=''
            }
            return state;
        }     
    }
});

export default LoginReducer.reducer