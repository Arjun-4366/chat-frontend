import { createSlice } from "@reduxjs/toolkit";

export const darkModeSlice = createSlice({
    name:'darkModeSlice',
    initialState:false,
    reducers:{
        toggleDarkTheme:(state)=>!state
    }
})
export const {toggleDarkTheme} = darkModeSlice.actions
export default darkModeSlice.reducer
