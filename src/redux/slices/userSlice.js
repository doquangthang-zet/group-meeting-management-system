import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";
import { useState } from "react";

var initialState = null; 

// console.log(initialState)

export const getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
    localStorage.removeItem('current_user');
    localStorage.setItem('current_user', JSON.stringify(user))
    initialState = JSON.parse(localStorage.getItem('current_user')).attributes
    return user;
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state) => {
            getUserData().then((res) => {
                initialState = res.attributes
            })
            state = initialState
            return state;
        },
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer