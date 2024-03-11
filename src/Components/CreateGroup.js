import { IconButton, TextField } from '@mui/material'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import React from 'react'
import { useSelector } from 'react-redux';


function CreateGroup() {
  const darkMode = useSelector((state=>state.darkModeKey))
  return (
    <div className={'create-group' + (darkMode ? ' bg-dark' : "")}>
      <TextField  label="Enter Group Name"  className={'grp-input' + (darkMode ? ' dark' : "")}/>
      <IconButton className={darkMode ? ' bg-dark' :""}>
           <DoneOutlineIcon/>
      </IconButton>
    </div>
  )
}

export default CreateGroup
