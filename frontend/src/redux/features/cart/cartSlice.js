// create slice

import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:[] ,     //name of redux slice
    reducers:{
        addToCart: (state,action)=>{
           const existingProduct=state.find((item)=>item.product._id===action.payload.product._id);
           
           if(existingProduct){
             existingProduct.quantity=action.payload.quantity
           }else{
            state.push({ ...action.payload,quantity:action.payload.quantity||1})
           }
         
        },
        removeToCart:(state,action)=>{
           return state.filter((product)=>product.product._id!==action.payload)
        },

        clearCart:(state,action)=>{
            return [];
        },
        setCart:(state,action)=>{
           return action.payload
        }

        
    }



})
  export const{
       addToCart,
       removeToCart,
       setCart,
       clearCart
  }=cartSlice.actions

export default cartSlice.reducer;

//Note:--
// .some()` does not give you access to that product outside its callback.