import { createSlice } from '@reduxjs/toolkit';
import {updateCustomer, getCustomer} from '../actions/customerAction';

export const CustomerReducer = createSlice({
    name: "cust",
    initialState:{
        
        error: '',
        pass: '',
        // Cust_Name:'',
        // Cust_Email:'',
        // Cust_City:'',
        // Cust_State:'',
        // Cust_Country:'',
        // Cust_Nickname:'',
        // Cust_Phone:'',
        // Cust_DOB:'',
        // Cust_Profile_Location:'',
        customer:[]
    },
   
    extraReducers:{
        [updateCustomer.fulfilled] : (state,action) => {
            console.log(action.payload+ 'Customer reducer')
            if (action.payload.auth){
                state.error = null
                state.pass = true
                // state.email = action.payload.email;
                // state.password= action.payload.password;
                // state.custID = action.payload.custID
            }
            else {
                console.log("here")
                state.error = "Could not update"
            }
            //return state;
        }, 
        [getCustomer.fulfilled] : (state,action) => {
            console.log(action.payload+ 'Customer reducer')
            if (action.payload.auth){
                state.error = null
                state.pass = true
                let newCustomer={
                    Cust_Name: action.payload.Cust_Name,
                    Cust_Nickname: action.payload.Cust_Nickname,
                    Cust_Phone: action.payload.Cust_Phone,
                    Cust_City: action.payload.Cust_City,
                    Cust_State: action.payload.Cust_State,
                    Cust_Country: action.payload.Cust_Country,
                    Cust_Email: action.payload.Cust_Email,
                    Cust_DOB: action.payload.Cust_DOB,
                    Cust_Profile_Location: action.payload.Cust_Profile_Location
                }
                state.customer.push(newCustomer);
                // state.email = action.payload.email;
                // state.password= action.payload.password;
                // state.custID = action.payload.custID
            }
            else {
                console.log("here")
                state.error = "Could not update"
            }
            //return state;
        },  
        // [clear.fulfilled] : (state, action) => {
        //     if (action.payload.arg){
        //         state.error = ''
        //         state.pass = false
        //         state.password = ''
        //         state.email=''
        //         state.custID=''
        //     }
        //     return state;
        // }     
    }
});

export default CustomerReducer.reducer;