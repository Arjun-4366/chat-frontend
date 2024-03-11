import React from 'react'
import UserList from './UserList';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
function AllUsers() {
  const darkMode = useSelector((state=>state.darkModeKey))
  return (
    <div className="chatArea-container">
    <div className={"chatArea-header" + (darkMode ? ' dark' : "")}>
      <div className="chat-header-status">
        <p className="chat-icon">
          <GroupsIcon />
        </p>
        <div>
          <p className="chat-name">Available Groups</p>
        </div>
      </div>
    </div>
    <div className={"sideBar-search" + (darkMode ? ' dark' : "")} >
      <IconButton>
        <SearchIcon />
      </IconButton>
      <input placeholder="Search here" className={darkMode ? ' dark':''} />
    </div>
    <div className={"userGroup-list" + (darkMode ? ' bg-dark' : "")} >
   <UserList/>
   <UserList/>
   <UserList/>
   <UserList/>
   <UserList/>
   <UserList/>
   <UserList/>
   <UserList/>
    </div>
  </div>
);
}


export default AllUsers
