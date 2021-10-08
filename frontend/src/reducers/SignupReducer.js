import { createSlice } from '@reduxjs/toolkit';
import {custSignup, custSignupClear} from '../actions/loginAction'

//===========CUSTOMER SIGNUP REDUCER================

export const custSignupReducer = createSlice({
    name: "custSignup",
    initialState:{
        error: '',
        pass: '',
    },
   
    extraReducers:{
        [custSignup.fulfilled] : (state,action) => {
            console.log('aa');
            console.log(action.payload.auth+ 'cust signup reducer')
            if (action.payload.auth){
                state.error = null
                state.pass = true
            }
            else {
                console.log("here")
                state.error = "Unable to sign in"
            }
            //return state;
        },  
        [custSignupClear.fulfilled] : (state, action) => {
            if (action.payload.arg){
                state.error = ''
                state.pass = false
            }
            return state;
        }     
    }
});

export default custSignupReducer.reducer