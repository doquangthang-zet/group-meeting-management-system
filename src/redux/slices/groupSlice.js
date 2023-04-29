import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groupID: "",
    location: "",
    startTime: "",
    endTime: "",
    memberList: [],
    value: 0,
}

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    }
})

export const { increment, decrement, incrementByAmount } = groupSlice.actions
export const selectGroup = (state) => state.group

export default groupSlice.reducer