import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./MainStyles.css";
import homeLogo from "../images/homeLogo.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios"
function Register() {
  const [userData,setUserData] = useState({userName:'',email:'',password:''})
  const navigate = useNavigate();

  const handleRegister = async() =>{
    try{
      const config = {
        headers:{ 
          'Content-type':'application/json'
        }
      }
      const response = await axios.post(  
        "https://chat-server-djx9ar71a-arjun-t-vs-projects.vercel.app/register",
         userData,
         config
      )
      localStorage.setItem('userDetails',JSON.stringify(response))
      console.log(response)
      navigate('/app/welcome',{state:{message:response.data.message}})
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
        <h4 >Register Here</h4>
        <TextField id="outlined-basic" label="Username" variant="outlined" name="userName" onChange={changeHandler}/>
        <TextField id="outlined-basic" label="Email" variant="outlined" name="email" onChange={changeHandler}/>
        <TextField id="outlined-basic" label="Password" variant="outlined" name="password" onChange={changeHandler} type="password"/>
        <Button variant="contained" onClick={handleRegister}>Register</Button>
        <h4 >Already have an account? <span
          onClick={() => {
            navigate("/");
          }}
          className="navigate-register">
          Login
        </span></h4>
        <p></p>
      </div>
    </div>
  );
}

export default Register;
