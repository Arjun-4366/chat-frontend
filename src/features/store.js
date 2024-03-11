import {configureStore} from '@reduxjs/toolkit' 
import  darkModeSlicetheme  from './themeSlice'

export const store =  configureStore({
    reducer:{
      darkModeKey:darkModeSlicetheme
    }
})

