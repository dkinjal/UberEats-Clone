import { switchUnstyledClasses } from '@mui/core';
import { createSlice } from '@reduxjs/toolkit';
import { addToCart, clearAdd, clearCart } from '../actions/cartAction';
import Cart from '../components/cartOnly/Cart';

//===============CART REDUCER===================================
export const CartReducer = createSlice({
    name: "cart",
    initialState:{
        Cart:[],
        error:null,
        count:0,
        RestID: 0,
        subTotal:0,
        totalCount:0
    },
   
    extraReducers:{
        [addToCart.fulfilled] : (state,action) => {
            let index=null;
            state.subTotal=0;
            state.totalCount++;
            state.RestID= action.payload.RestID
            for(let i=0; i< state.Cart.length; i++){
                if(action.payload.DishID===state.Cart[i].DishID){
                    index=i;
                }
            }
            if(index==null){
            if (action.payload.auth){
                state.error = null
                state.pass = true
                
                let count=0;
                let newCartItem = {
                    DishID: action.payload.DishID,
                    DishName: action.payload.DishName,
                    DishCost: action.payload.DishCost,
                    count: count+1
                }
                state.Cart.push(newCartItem);

            }
            }else if(index!=null){
                if (action.payload.auth){
                    state.error = null
                    state.pass = true
                    state.Cart[index].count++;
                }
            }
            else {
                console.log("here")
                state.error = "Issues"
            }
            
                // state.Cart.map((x)=>(
                //   x.subTotal= (x.subTotal+ (x.DishCost* x.count))
                // ))
                for(let i=0; i< state.Cart.length; i++){
                    
                    state.subTotal= (state.subTotal+ (state.Cart[i].DishCost* state.Cart[i].count))
                }
                
                
            //return state;
        },  
        [clearAdd.fulfilled] : (state,action) => {
            let index=null;
            state.error = ''
                state.pass = false
                state.Cart = []
                state.totalCount=0
                state.RestID=0
                state.subTotal=0
            state.totalCount++;
            state.RestID= action.payload.RestID
            for(let i=0; i< state.Cart.length; i++){
                if(action.payload.DishID===state.Cart[i].DishID){
                    index=i;
                }
            }
            if(index==null){
            if (action.payload.auth){
                state.error = null
                state.pass = true
                
                let count=0;
                let newCartItem = {
                    DishID: action.payload.DishID,
                    DishName: action.payload.DishName,
                    DishCost: action.payload.DishCost,
                    count: count+1
                }
                state.Cart.push(newCartItem);

            }
            }else if(index!=null){
                if (action.payload.auth){
                    state.error = null
                    state.pass = true
                    state.Cart[index].count++;
                }
            }
            else {
                console.log("here")
                state.error = "Issues"
            }
                for(let i=0; i< state.Cart.length; i++){
                    
                    state.subTotal= (state.subTotal+ (state.Cart[i].DishCost* state.Cart[i].count))
                }
                
                
            //return state;
        },  
        [clearCart.fulfilled] : (state, action) => {
            if (action.payload.arg){
                console.log('inside clear reducer')
                state.error = ''
                state.pass = false
                state.Cart = []
                state.totalCount=0
                state.RestID=0
                state.subTotal=0
               
                
            }
            //return state;
        } 
        
        
    }
});

export default CartReducer.reducer