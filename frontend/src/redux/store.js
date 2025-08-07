
import {configureStore} from "@reduxjs/toolkit"
import { setupListeners} from "@reduxjs/toolkit/query/react"
import authReducer from "./features/auth/authSlice.js"
import { apiSlice } from "./api/apiSlice.js"
import  shopReducer from "./features/shop/shopSlice.js"
import favouriteReducer from "./features/favourite/favouriteSlice.js"
import { getfavouriteFromLocalStorage } from "../utils/favouriteLocalStorage.js"
import cartReducer from "./features/cart/cartSlice.js"

const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,

        auth:authReducer,
        favourites:favouriteReducer,
        shop:shopReducer,
        cart:cartReducer   
    },
    // preloadedState:{
    //     favourites:initialFavourites
    // },

     middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare().concat(apiSlice.middleware),
     devTools:true
   
})
setupListeners(store.dispatch)
export default store;