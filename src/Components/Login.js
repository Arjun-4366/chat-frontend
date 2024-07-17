import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./MainStyles.css";
import homeLogo from "../images/homeLogo.jpg"
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [userData,setUserData] = useState({userName:'',password:''})
  const [message,setMessage] = useState()

  const  navigate = useNavigate()
  const loginHandler = async(e) =>{
    console.log('userdata',userData)
    e.preventDefault()
    try{
    const config = {
      headers:{
        'Content-type':'application/json'
      }
    }
    const response = await axios.post("https://chat-server-djx9ar71a-arjun-t-vs-projects.vercel.app/login",
    userData,
    config
    )
      if(response.data.message){
        console.log(response.data)
        setMessage(response.data.message)
      }
      else{
        localStorage.setItem('userDetails',JSON.stringify(response))
        console.log(response.data)
        navigate('/app/welcome')
      }
      
    }
    catch(error){
      console.log(error.message)
    }

   
  }
  const changeHandler = (e)=>{
    setUserData({...userData,[e.target.name]:e.target.value})
 }

  return (
    <div className="main-container">
      <div className="sideBar">
      <img src={homeLogo} alt="" />
      </div>
      <div className="login-box">
        <h4 className="text-success">Login With Your Username and Password</h4>
        <TextField id="outlined-basic" label="Username" variant="outlined" onChange={changeHandler} name="userName"/>
        <TextField id="outlined-basic" label="Password" variant="outlined" onChange={changeHandler} name="password" type="password"/>
        <Button variant="contained" onClick={loginHandler}>Login</Button>
        <h3 className="text-warning">{message}</h3>
        <h4 className="text-success">Doesn't Have any account ? <span onClick={()=>{
          navigate('register')
        }} className="navigate-register">Create One</span>
        </h4>
      </div>
    </div>
  );
}

export default Login;
