import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { createGroupNUser, createRequest } from "../../dynamoDB";
import { deleteRequest } from "../../dynamoDB";

export const GROUP_IDLE = 0
export const GROUP_REQUEST_PENDING = 1
export const GROUP_REQUEST_REJECTED = 2
export const GROUP_REQUEST_SUCCESS = 3
export const GROUP_ADD_MEMBER_PENDING = 4
export const GROUP_ADD_MEMBER_SUCCESS = 5
export const GROUP_ADD_MEMBER_REJECTED = 6
export const GROUP_DELETE_REQUEST_PENDING = 7
export const GROUP_DELETE_REQUEST_SUCCESS = 8
export const GROUP_DELETE_REQUEST_REJECTED = 9

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

export const addMemberToGroupAsync = createAsyncThunk('group/addMemberToGroupAsync', async(data) => {
    const hash = nanoid()
    const memberInfo = {
        "id" : hash,
        ...data
    }
    const fMemberInfo = JSON.stringify(memberInfo)

    await createGroupNUser(fMemberInfo)

})

export const deleteRequestAsync = createAsyncThunk('group/deleteRequestAsync', async(id) => {
    await deleteRequest(id)
})

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        changeGroupStatus: (state, action) => {
			state.status = action.payload
		},
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
            .addCase(addMemberToGroupAsync.pending, state => {
                state.status = GROUP_ADD_MEMBER_PENDING
            })
            .addCase(addMemberToGroupAsync.fulfilled, (state,action) => {
                state.status = GROUP_ADD_MEMBER_SUCCESS
            })
            .addCase(addMemberToGroupAsync.rejected, (state, action) => {
                state.status = GROUP_ADD_MEMBER_REJECTED
            })
            .addCase(deleteRequestAsync.pending, state => {
                state.status = GROUP_DELETE_REQUEST_PENDING
            })
            .addCase(deleteRequestAsync.fulfilled, state => {
                state.status = GROUP_DELETE_REQUEST_SUCCESS
            })
            .addCase(deleteRequestAsync.rejected, state => {
                state.status = GROUP_DELETE_REQUEST_REJECTED
            })
    }
})

export const selectGroup = (state) => state.group

export const { changeGroupStatus } = groupSlice.actions

export default groupSlice.reducer