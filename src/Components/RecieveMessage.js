import React from 'react'
import "./MainStyles.css";
import { useSelector } from 'react-redux';

function RecieveMessage() {
    let props1  = {message:'Sample message'}
    const darkMode = useSelector((state=>state.darkModeKey))
  return (
    <div className='receive-container'>
      <div className="receive-message">
          <p className="chat-icon">P</p>
          <div className='receive-text'>
            <p className="chat-lastMessage ">{props1.message}</p>
          </div>
          <p className={"chat-timestamp" + (darkMode ? ' bg-time' : "")}>12:00</p>
        </div>
    </div>
  )
}

export default RecieveMessage
