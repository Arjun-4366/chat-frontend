import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import "./MainStyles.css";
import RecieveMessage from "./RecieveMessage";
import SendMessage from "./SendMessage";
import { useSelector } from "react-redux";

function ChatArea() {
  const darkMode = useSelector((state)=>state.darkModeKey)
  return (
    <div className="chatArea-container">
      <div className={"chatArea-header" + (darkMode ? ' dark' : "")}>
        <div className="chat-header-status">
          <p className="chat-icon">P</p>
          <div>
            <p className="chat-name">Person</p>
            <p className="chat-timestamp">Online</p>
          </div>
        </div>
        <div className="chatArea-delete-btn">
          <IconButton className={darkMode ? ' dark' : ""}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>    
      <div className="chatArea-message ">
        <RecieveMessage />
        <SendMessage />
        <RecieveMessage />
        <SendMessage />
        <RecieveMessage />
        <SendMessage />
        <RecieveMessage />
        <SendMessage />
        <RecieveMessage />
        <SendMessage />
      </div>
      <div className={"chatArea-text"+ (darkMode ? ' dark' :"")}>
        <input
          type="text"
          className={"input-message" + (darkMode ? ' dark' :"")}
          placeholder="Type a message here"
        />
        <IconButton  className={'send-btn'+(darkMode ? ' dark' :"")}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatArea;
