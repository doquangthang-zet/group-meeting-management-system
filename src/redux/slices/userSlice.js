import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    fullName: "",
    email: "",
    sid: "",
    avaUrl: "",
    value: 0,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increase: (state) => {
            state.value += 1
        },
        decrease: (state) => {
            state.value -= 1
        },
    }
})

export const { increase, decrease } = userSlice.actions

export default userSlice.reducer