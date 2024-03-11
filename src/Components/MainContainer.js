import React from "react";
import "./MainStyles.css";
import SideBar from "./SideBar";
import ChatArea from "./ChatArea";
import ChatHome from "./ChatHome";
import CreateGroup from "./CreateGroup";
import Login from "./Login";
import UserGroups from "./UserGroups";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function MainContainer() {
  const darkMode =  useSelector((state)=>state.darkModeKey)
  return (
    <div className={"main-container"+(darkMode ? ' bg-dark' : "")}>
      <SideBar />
       <Outlet />
      {/* <UserGroups/> */}
      {/* <Login/> */}
      {/* <CreateGroup/> */}
      {/* <ChatHome/> */}
      {/* <ChatArea /> */}
    </div>
  );
}

export default MainContainer;
