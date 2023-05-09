import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { updateUser } from "../../dynamoDB";

export const USER_IDLE = 0
export const USER_UPDATE_PENDING = 1
export const USER_UPDATE_SUCCESS = 2
export const USER_UPDATE_REJECTED = 3



const initialState = {
    user:{
        id: "",
        name:"",
    },
    userInfoUpdateStatus: USER_IDLE,
    isAuthenticated: ""
};


export const updateUserAsync = createAsyncThunk('user/updateUserAsync', async(data) => {
    const finalUserInfo = JSON.stringify(data)
    console.log(finalUserInfo)
    await updateUser(finalUserInfo)
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state,action)=> {
            console.log("PAYLOAD",action.payload)
            state.user = action.payload
        },
        setAuthenticationState:(state,action) => {
            console.log("PAYLOAD ROUTE", action.payload)
            state.isAuthenticated = action.payload
        },
        changeUserUpdateStatus:(state, action) =>{
            state.userInfoUpdateStatus = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(updateUserAsync.pending, state => {
                state.userInfoUpdateStatus = USER_UPDATE_PENDING
            })
            .addCase(updateUserAsync.fulfilled,(state,action) =>{
                state.userInfoUpdateStatus = USER_UPDATE_SUCCESS
            })
            .addCase(updateUserAsync.rejected,(state,action) => {
                state.userInfoUpdateStatus = USER_UPDATE_REJECTED
            })
        }
})

export const selectUser = (state) => state.user

export const { setUser, changeUserUpdateStatus, setAuthenticationState } = userSlice.actions

export default userSlice.reducer