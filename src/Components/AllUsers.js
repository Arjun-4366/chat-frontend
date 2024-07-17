import React, { useEffect, useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { reloadChatListHandler } from "../features/reloadSlice";
function AllUsers() {
  const darkMode = useSelector((state) => state.darkModeKey);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const userData = localStorage.getItem("userDetails");
  const dispatch = useDispatch()
  
  // console.log("data from localstorage", userData);


  useEffect(() => { 
    if (!userData) {
      console.log("user is not authenticated");
      navigate(-1);
    }
    // console.log('user refreshed')
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(userData).data.token}`,
          },
        };
        const response = await axios.get("https://chat-server-flame.vercel.app/users", config);
        // console.log("data from backend", response);
        setUsers(response.data);
        console.log('users',users)
      } catch (error) {
        console.log(error.message);
      } 
    };
    fetchUsers();
  }, [userData,navigate,dispatch]);
  return (
    <div className="chatArea-container">
      <div className={"chatArea-header" + (darkMode ? " dark" : "")}>
        <div className="chat-header-status">
          <p className="chat-icon">
            <ChatBubbleIcon />
          </p>
          <div>
            <p className="chat-name"> Users</p>
          </div>
        </div>
      </div> 
      {/* <div className={"sideBar-search" + (darkMode ? " dark" : "")}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input placeholder="Search here" className={darkMode ? " dark" : ""} />
      </div> */}
      <div className={"userGroup-list" + (darkMode ? " bg-dark" : "")}>
        {users.map((user, index) => (
          <div
            className={"sideBar-chat-container" + (darkMode ? " dark" : "")}
            key={index} onClick={async()=>{
              dispatch(reloadChatListHandler())
              const config = {
                headers:{ 
                  Authorization:`Bearer ${JSON.parse(userData).data.token}`
                }
              }
              await axios.post('https://chat-server-flame.vercel.app/chat/chatAccess',
              {
                userId:user._id
              },config)
              
              // console.log('response chat access',response)
            }}> 
            <p className="chat-icon">{user.userName.charAt(0)}</p>
            <p className="chat-name">{user.userName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUsers;
