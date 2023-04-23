import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";
import { useState } from "react";

const initialState = {
    user:{
        id: "",
        name:"",
    }
}; 

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state,action)=> {
            console.log("PAYLOAD",action.payload)
            state.user = action.payload
        }
    }
})

export const selectUser = (state) => state.user

export const { setUser } = userSlice.actions

export default userSlice.reducer