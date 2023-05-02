import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
import {createGroup, createGroupNUser, deleteGroupNUser, deleteGroup} from "../../dynamoDB"

export const GROUP_IDLE = 0
export const GROUP_CREATE_PENDING = 1
export const GROUP_CREATE_REJECTED = 2
export const GROUP_CREATE_SUCCESS = 3

const initialState = {
    id: "",
    groupname: "",
    location: "",
    host: "",
    time: "",
    groupNuser: "",

}

export const createGroupAsync = createAsyncThunk('group/createGroupAsync', async(data) => {
    const dataToJson = JSON.stringify({
        id: data.groupID,
        date: data.formated_date,
        groupname: data.name,
        host: data.userID,
        location: data.location,
        time: data.time
    })
    const groupNuserToJson = JSON.stringify({
        id: data.groupNuserID,
        groupid: data.groupID,
        role: "host",
        userid: data.userID
    })
    console.log(data.groupNuserID)
    console.log(groupNuserToJson)
    await createGroup(dataToJson)
    await createGroupNUser(groupNuserToJson)
})

export const deleteGroupNUserAsync = createAsyncThunk('group/deleteGroupNUserAsync', async(data) => {
    deleteGroupNUser(data)
    return data
})

export const deleteForHostAsync = createAsyncThunk('group/deleteForHostAsync', async(data) => {
    console.log(data)
    deleteGroup(data.id)
    data.list.forEach(id => {
        deleteGroupNUser(id)
    });
    return data
})
export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
    }
})

export const { increment, decrement, incrementByAmount } = groupSlice.actions

export default groupSlice.reducer