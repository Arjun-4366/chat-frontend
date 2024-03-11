import React, { useState } from "react";
import "./MainStyles.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import Chatlist from "./Chatlist";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkTheme } from "../features/themeSlice";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function SideBar() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkModeKey);

  const [chats, setChats] = useState([
    {
      name: "Person1",
      lastMessage: "Last Message",
      timestamp: "today",
    },
    {
      name: "Person1",
      lastMessage: "Last Message",
      timestamp: "yesterday",
    },
    {
      name: "Person1",
      lastMessage: "Last Message",
      timestamp: "today",
    },
    {
      name: "Person1",
      lastMessage: "Last Message",
      timestamp: "today",
    },
  ]);
  let navigate = useNavigate();
  return (
    <div className={"sideBar" + (darkMode ? " bg-dark" : "")}>
      <div className={"sideBar-header" + (darkMode ? " dark" : "")}>
        <div className="sideBar-icons">
          <div>
            <IconButton className={darkMode ? " dark" : ""}>
              <AccountCircleIcon />
            </IconButton>
          </div>

          <IconButton
            className={darkMode ? " dark" : ""}
            onClick={() => {
              navigate("users");
            }}>
            <ChatIcon />
          </IconButton>
          <IconButton
            className={darkMode ? " dark" : ""}
            onClick={() => {
              navigate("groups");
            }}>
            <GroupsIcon />
          </IconButton>
          <IconButton
            className={darkMode ? " dark" : ""}
            onClick={() => {
              navigate("createGroup");
            }}>
            <GroupAddIcon />
          </IconButton>
          <IconButton
            className={darkMode ? " dark" : ""}
            onClick={() => {
              dispatch(toggleDarkTheme());
            }}>
            {darkMode && <DarkModeIcon />}
            {!darkMode && <LightModeIcon />}
          </IconButton>
        </div>
      </div>
      <div className={"sideBar-search" + (darkMode ? " dark" : "")}>
        <IconButton className={darkMode ? " dark" : ""}>
          <SearchIcon />
        </IconButton>
        <input placeholder="Search here" className={darkMode ? " dark" : ""} />
      </div>
      <div className={"sideBar-chat" + (darkMode ? " bg-dark" : "")}>
        {chats.map((chat, i) => {
          return <Chatlist props={chat} dark={darkMode} key={i} />;
        })}
      </div>
    </div>
  );
}

export default SideBar;
