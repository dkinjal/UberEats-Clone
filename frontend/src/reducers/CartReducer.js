import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from '../actions/cartAction';
import Cart from '../components/cartOnly/Cart';

//===============CART REDUCER===================================
export const CartReducer = createSlice({
    name: "cart",
    initialState:{
        Cart:[],
        error:null,
        count:0,
        RestID: 0
    },
   
    extraReducers:{
        [addToCart.fulfilled] : (state,action) => {
            let index=null;
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
            //return state;
        },  
        // [clear.fulfilled] : (state, action) => {
        //     if (action.payload.arg){
        //         state.error = ''
        //         state.pass = false
        //         state.password = ''
        //         state.email=''
        //     }
        //     return state;
        // }     
    }
});

export default CartReducer.reducer