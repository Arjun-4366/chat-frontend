import { IconButton } from "@mui/material";
import React from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import "./MainStyles.css";
import SearchIcon from "@mui/icons-material/Search";
import UserGroupList from "./UserGroupList";
import { useSelector } from "react-redux";

function UserGroups() {
  const darkMode = useSelector((state=>state.darkModeKey))
   console.log(darkMode)
  return (
    <div className={"chatArea-container"+ (darkMode ? ' bg-dark' : "")}>
      <div className={"chatArea-header" + (darkMode ? ' dark' : "")}>
        <div className="chat-header-status">
          <p className="chat-icon">
            <ChatBubbleIcon />
          </p>
          <div>
            <p className="chat-name">Online users</p>
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
      <UserGroupList />
      <UserGroupList />
      <UserGroupList />
      <UserGroupList />
      <UserGroupList />
      <UserGroupList />
      <UserGroupList />
      <UserGroupList />
      <UserGroupList />
      <UserGroupList />
      </div>
    </div>
  );
}

export default UserGroups;
