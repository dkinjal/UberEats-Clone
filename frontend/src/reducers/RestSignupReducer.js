import { createSlice } from '@reduxjs/toolkit';
import {restSignup, restSignupClear} from '../actions/restLoginAction'

//=========RESTAURANT SIGNUP REDUCER===========
export const SignupReducer = createSlice({
    name: "restSignup",
    initialState:{
        error: '',
        pass: '',
    },
   
    extraReducers:{
        [restSignup.fulfilled] : (state,action) => {
            console.log('aa');
            console.log(action.payload.auth+ 'signup reducer')
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
        [restSignupClear.fulfilled] : (state, action) => {
            if (action.payload.arg){
                state.error = ''
                state.pass = false
            }
            return state;
        }     
    }
});

export default SignupReducer.reducer