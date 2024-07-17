import React from 'react'
import "./MainStyles.css";
import { useSelector } from 'react-redux';

function RecieveMessage(props) {
    const darkMode = useSelector((state=>state.darkModeKey))
  return (
    <div className='receive-container'>
      <div className="receive-message">
          <p className="chat-icon">{props.send.userName[0]}</p>
          <div className='receive-text'>
            <p className="chat-lastMessage ">{props.text}</p>
          </div>
          <p className={"chat-timestamp" + (darkMode ? ' bg-time' : "")}>12:00</p>
        </div>
    </div>
  )
}

export default RecieveMessage
