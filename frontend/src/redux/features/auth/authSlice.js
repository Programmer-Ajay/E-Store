
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:null,
    loading:true
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo=action.payload;
            state.loading=false
        },
       
        logout:(state)=>{
            state.userInfo=null,
            state.loading=true
        }
    }
})
export const {setCredentials,logout}=authSlice.actions;

export default authSlice.reducer;