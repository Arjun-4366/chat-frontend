import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import "./MainStyles.css";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function UserGroups() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const userData = localStorage.getItem("userDetails");

  useEffect(() => {
    if (!userData) {
      navigate(-1);
    }

    const fetchGroups = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer${JSON.parse(userData).data.token}`,
          },
        };
        const response = await axios.get(
          "https://chat-server-djx9ar71a-arjun-t-vs-projects.vercel.app/chat/getGroups",
          config
        );
        console.log("userGroup data ", response.data);
        setGroups(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchGroups();
  },[userData]);

  const darkMode = useSelector((state) => state.darkModeKey);
  console.log(darkMode);
  return (
    <div className={"chatArea-container" + (darkMode ? " bg-dark" : "")}>
      <div className={"chatArea-header" + (darkMode ? " dark" : "")}>
        <div className="chat-header-status">
          <p className="chat-icon">
            <GroupsIcon />
          </p>
          <div>
            <p className="chat-name">Available groups</p>
          </div>
        </div>
      </div>
      <div className={"sideBar-search" + (darkMode ? " dark" : "")}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input placeholder="Search here" className={darkMode ? " dark" : ""} />
      </div>
      <div className={"userGroup-list" + (darkMode ? " bg-dark" : "")}>
        {groups.map((group, index) => {
           let chatName = group.chatName
          if (group.isGroupChat) {
            return(
              <div
              className={"sideBar-chat-container" + (darkMode ? " dark" : "")}
              key={index }onClick={() => {
                navigate(`/app/chat/${group._id}&${chatName}`);
              }}>
              <p className="chat-icon">{group.chatName.charAt(0)}</p>
              <p className="chat-name">{group.chatName}</p>
            </div>
            )
           
          }
        })}
      </div>
    </div>
  );
}

export default UserGroups;
