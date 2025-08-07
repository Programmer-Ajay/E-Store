// redux  favourite reducer

import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice= createSlice({
    name:"favourites",
    initialState:[],
    reducers:{
        addToFavourite:(state,action)=>{
           //check if the product is present
           if(!state.some((product)=>product._id===action.payload._id)){

            state.push(action.payload)
        }
    },
    removeFromFavourites:(state,action)=>{
        // remove the favourite from the favourite
        return state.filter((product)=>product._id!== action.payload._id);
    },
    setFavourites:(state,action)=>{
        // Set the favourite items from the local storage when agian the user comeback to website
        return action.payload;
    },
    clearFavourite:()=>{
         return [];
    }


    },
})
export const {
    addToFavourite,setFavourites,removeFromFavourites,
    clearFavourite
}=favouriteSlice.actions;

export const selectedFavouriteProduct=(state)=>state.favourite;
// you can write this line as a like in the direct in components like this

// const favourite=(state)=>state.favourite
export default favouriteSlice.reducer;
