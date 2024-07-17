import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useRef, useState } from "react";
import "./MainStyles.css";
import  {useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client"
import { reloadChatListHandler } from "../features/reloadSlice";


const ENDPOINT = "http://localhost:3004";
var socket;
function ChatArea() {
  const [text, setText] = useState("");
  const [allText, setAllText] = useState([]);
  const [allTextCopy, setAllTextCopy] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  
  const userData = JSON.parse(localStorage.getItem("userDetails"));
  const textRef = useRef(null);
  const params = useParams()
  const [chat_id, chat_user] = params._id.split("&");
  const darkMode = useSelector((state) => state.darkModeKey);
  const dispatch = useDispatch()


   


  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connection", () => setSocketConnected(!socketConnected));

    return()=>{
      socket.disconnect()
    }
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (!allTextCopy || allTextCopy._id != newMessageRecieved._id) {
      } else {
        console.log("send completed");
        setAllText([...allText, newMessageRecieved]);
      }
    });
  });

  const sendMessagehandler = async () => {
    try {
      textRef.current.value = "";
      const config = {
        headers: {
          Authorization: `Bearer ${userData.data.token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:3004/message/",
        {
          text: text,
          chatId: chat_id,
        },
        config
      );
      dispatch(reloadChatListHandler())
      socket.emit("new message", response.data);
      console.log("message fired");

      console.log("message response", response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //  fetching all messages

  useEffect(() => {
   
    const fetchAllMessages = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.data.token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:3004/message/" + chat_id,
          config
        );

        socket.emit("join chat", chat_id);
        setAllText(response.data);
        setAllTextCopy(allText);
       
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAllMessages();
  }, [chat_id, userData.data.token, allText]);

 


  return (
    <div className="chatArea-container">
      <div className={"chatArea-header" + (darkMode ? " dark" : "")}>
        <div className="chat-header-status">
          <p className="chat-icon">{chat_user[0]}</p>
          <div>
            <p className="chat-name">{chat_user}</p>
            <p className="chat-timestamp"></p>
          </div>
        </div>
        {/* <div className="chatArea-delete-btn">
            <IconButton className={darkMode ? ' dark' : ""}>
              <DeleteIcon />
            </IconButton>
          </div> */}
      </div>
      <div   className="chatArea-message ">
        {allText.map((message, index) => {
          const send = message.send;
          const selfId = userData.data._id;
          if (send._id === selfId) {
            return (
              // <SendMessage props = {message.text} key={index}/>
              <div className="receive-container " key={index}>
                <div className="send-message ">
                  <div className="send-text">
                    <p className="chat-lastMessage ">{message.text}</p>
                  </div>
                  <p
                    className={"chat-timestamp" + (darkMode ? " bg-time" : "")}>
                    {message.time}
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="receive-container" key={index}>
                <div className="receive-message">
                  <p className="chat-icon">{message.send.userName[0]}</p>

                  <div className="receive-text">
                    <p className="chat-userName">{message.send.userName}</p>
                    <p className="chat-lastMessage ">{message.text}</p>
                  </div>
                  <p
                    className={"chat-timestamp" + (darkMode ? " bg-time" : "")}>
                    {message.time}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className={"chatArea-text" + (darkMode ? " dark" : "")}>
        <input
          ref={textRef}
          type="text"
          className={"input-message" + (darkMode ? " dark" : "")}
          placeholder="Type a message here"
          onChange={(e) => setText(e.target.value)}
        />
        <IconButton
          className={"send-btn" + (darkMode ? " dark" : "")}
          onClick={sendMessagehandler}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatArea;
