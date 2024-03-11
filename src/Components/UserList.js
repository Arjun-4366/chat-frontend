import React from "react";
import { useSelector } from "react-redux";

function UserList() {
  const darkMode = useSelector((state=>state.darkModeKey))
  return (
    <div className={"sideBar-chat-container" + (darkMode ? ' dark' : "")}>
      <p className="chat-icon">G</p>
      <p className="chat-name">Group</p>
    </div>
  );
}

export default UserList;
