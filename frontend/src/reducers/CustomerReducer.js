import { createSlice } from '@reduxjs/toolkit';
import {updateCustomer, getCustomer} from '../actions/customerAction';

export const CustomerReducer = createSlice({
    name: "cust",
    initialState:{
        
        error: '',
        pass: '',
        Cust_Name: '',
        Cust_Nickname:'',
        Cust_Phone:'',
        Cust_City:'',
        Cust_State:'',
        Cust_Country:'',
        Cust_Email:'',
        Cust_DOB:'',
        Cust_Profile_Location:'',
         
    },
   
    extraReducers:{
        [updateCustomer.fulfilled] : (state,action) => {
            console.log(action.payload.data+ 'Customer reducer')
            if (action.payload.auth) {
                
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
        [getCustomer.fulfilled]: (state, action) => {
            
            // console.log(action.payload.Cust_Email+ 'Customer reducer')
            console.log(JSON.parse(action.payload.product)+ 'Customer reducer')
            let data =JSON.parse(action.payload.product)
            if (action.payload.auth) {
                console.log("inside auth")
                state.error = null
                state.pass = true
                console.log(data)
                // let newCustomer={
                    state.Cust_Name= data.Cust_Name
                    state.Cust_Nickname= data.Cust_Nickname
                    state.Cust_Phone= data.Cust_Phone
                    state.Cust_City= data.Cust_City
                    state.Cust_State= data.Cust_State
                    state.Cust_Country= data.Cust_Country
                    state.Cust_Email= data.Cust_Email
                    state.Cust_DOB= data.Cust_DOB
                    state.Cust_Profile_Location=data.Cust_Profile_Location
                // }
                // console.log(newCustomer)
                // state.customer.push(newCustomer);
                // state.email = data.Cust_Email;


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