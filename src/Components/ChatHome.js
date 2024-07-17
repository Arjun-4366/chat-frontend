import React from 'react'
import homeLogo from "../images/homeLogo.jpg"
import { useNavigate } from 'react-router-dom'

function ChatHome() {
  const userData = JSON.parse(localStorage.getItem("userDetails"))
  console.log(userData)
  const navigate = useNavigate()
  if(!userData){
    console.log('user not authenticated')
    navigate('/')
  }
  return (
    
    <div className='chat-home'>
      <img src={homeLogo} alt="" />
      <h3 style={{color:'green'}}>Welcome {userData.data.userName}</h3>
       <h3 style={{color:'grey'}}>Go to users and start messaging!!!!</h3>
    </div>
    
  )
}

export default ChatHome
