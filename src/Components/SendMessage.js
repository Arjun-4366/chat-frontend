import React from 'react'
import "./MainStyles.css";
import { useSelector } from 'react-redux';
function SendMessage(props) {
    
    const darkMode = useSelector((state=>state.darkModeKey))
  return (
    <div className='receive-container '>
    <div className="send-message ">
        <div className='send-text'>
          <p className="chat-lastMessage ">{props}</p>
          {/* {console.log("texts",props)} */}
        </div>
        <p className={"chat-timestamp" + (darkMode ? ' bg-time' : "")}>12:00</p>
      </div>
  </div>
  )
}

export default SendMessage
