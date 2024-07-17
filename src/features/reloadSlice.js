import { createSlice } from "@reduxjs/toolkit";

export const reloadChatList = createSlice({
    name:'reloadChatList',
    initialState:false,
    reducers:{
        reloadChatListHandler:(state)=>!state
    }
})
export const {reloadChatListHandler} = reloadChatList.actions
export default reloadChatList.reducer
