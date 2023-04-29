import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { createRequest } from "../../dynamoDB";

export const GROUP_IDLE = 0
export const GROUP_REQUEST_PENDING = 1
export const GROUP_REQUEST_REJECTED = 2
export const GROUP_REQUEST_SUCCESS = 3

const initialState = {
    groupInfo:{
        groupid: "",
        location: "",
        date: "",
        time: "",
        groupname: "",
    },
    status: GROUP_IDLE
}

export const createGroupRequestAsync = createAsyncThunk('group/createGroupRequestAsync', async(data) => {
    const hash = nanoid()
    const requestInfo = {
        "id": hash,
        ...data
    }
    const final_requestInfo = JSON.stringify(requestInfo)
    await createRequest(final_requestInfo)
})

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder
            .addCase(createGroupRequestAsync.pending, state => {
                state.status = GROUP_REQUEST_PENDING
            })
            .addCase(createGroupRequestAsync.fulfilled,(state,action) =>{
                state.status = GROUP_REQUEST_SUCCESS
            })
            .addCase(createGroupRequestAsync.rejected,(state,action) => {
                state.status = GROUP_REQUEST_REJECTED
            })
    }
})

export const selectGroup = (state) => state.group

export const {  } = groupSlice.actions

export default groupSlice.reducer