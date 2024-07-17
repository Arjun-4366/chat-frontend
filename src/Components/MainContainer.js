import React from "react";
import "./MainStyles.css";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";




function MainContainer() {
  const darkMode = useSelector((state)=>state.darkModeKey)
  
  return (
    <div className={"main-container"+(darkMode ? ' bg-dark' : "")}>
    
      <SideBar />
       <Outlet />
    
    
    
    </div>
  );
}

export default MainContainer;
