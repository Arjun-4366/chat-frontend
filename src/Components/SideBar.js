import React, { useEffect, useState } from "react";
import "./MainStyles.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from "@mui/material";
// import Chatlist from "./Chatlist";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkTheme } from "../features/themeSlice";
import GroupsIcon from "@mui/icons-material/Groups";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import {motion,AnimatePresence} from 'framer-motion'


function SideBar() {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  
  const darkMode = useSelector((state) => state.darkModeKey);
  const userData = localStorage.getItem("userDetails");
  const reload = useSelector((state) => state.reloadKey);
 


  // console.log('reloads',reload)
  let navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userDetails");
    navigate("/");
  };
  if (!userData) {
    console.log("user is not authenticated");
    navigate("/");
  }
 

  useEffect(() => {
    setTimeout(() => {
      console.log('chats reloaded')
      getChats();
    }, 500);
  }, [reload, search]);

  const getChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(userData).data.token}`,
        },
      };
      const response = await axios.post(
        "https://chat-server-flame.vercel.app/chat/getChats",
        { search: search },
        config
      );
      setChats(response.data);
      console.log("chats", response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={"sideBar" + (darkMode ? " bg-dark" : "")}>
      <div className={"sideBar-header" + (darkMode ? " dark" : "")}>
        <div className="sideBar-icons">
          <div>
            <IconButton className={darkMode ? " dark" : ""} onClick={()=>{
              navigate('profile')
            }}>
              <AccountCircleIcon />
            </IconButton>
          </div>
        

          <IconButton
            className={darkMode ? " dark" : ""}
            onClick={() => {
              navigate("users");
            }}>
            <PersonIcon />
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
          <IconButton
            onClick={logoutHandler}
            className={darkMode ? " dark" : ""}>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
      <div className={"sideBar-search" + (darkMode ? " dark" : "")}>
        <IconButton className={darkMode ? " dark" : ""}>
          <SearchIcon />
        </IconButton>
        <input
          placeholder="Search here"
          className={darkMode ? " dark" : ""}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <AnimatePresence>
        
      <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} transition={{duration:'0.3'}} className={"sideBar-chat" + (darkMode ? " bg-dark" : "")}>
        {chats.map((chat, i) => {
          let chatName;

          if (chat.isGroupChat) {
            chatName = chat.chatName;
          } else {
            const user = chat.users.find(
              (user) => user._id !== JSON.parse(userData).data._id
            );

            if (user) {
              chatName = user.userName;
            }
          }
          if (!chat.lastMessage) {
            return (
              <div
                className={"sideBar-chat-container" + (darkMode ? " dark" : "")}
                onClick={() => {
                  navigate(`chat/${chat._id}&${chatName}`)
                  
                }}
                key={i}>
                <p className="chat-icon">{chatName.charAt(0)}</p>
                <p className="chat-name">{chatName}</p>
                <p className="chat-lastMessage">
                  No last message
                </p>
               
              </div>
            );
          } else {
            return (
              <div
                className={"sideBar-chat-container" + (darkMode ? " dark" : "")}
                onClick={() => {
                  navigate(`chat/${chat._id}&${chatName}`)
                  
                }}
                key={i}>
                <p className="chat-icon">{chatName.charAt(0)}</p>
                <p className="chat-name">{chatName}</p>
                <p className="chat-lastMessage">{chat.lastMessage.text}</p>
                
              </div>
            );
          }
        })} 
      </motion.div>
      
      </AnimatePresence>
    </div>
  );
}

export default SideBar;
