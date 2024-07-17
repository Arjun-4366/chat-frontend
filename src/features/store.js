import {configureStore} from '@reduxjs/toolkit' 
import  darkModeSlicetheme  from './themeSlice'
import  reloadSlice from './reloadSlice'
// import notificationSlice from './notificationSlice'

export const store =  configureStore({
    reducer:{
      darkModeKey:darkModeSlicetheme,
      reloadKey:reloadSlice,
      // notificationKey:notificationSlice
    }
})

