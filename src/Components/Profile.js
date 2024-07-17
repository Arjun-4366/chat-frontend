import React, { useState } from "react";
import { TextField, Button ,Form} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [userName,setUserName] = useState(userDetails.data.userName)
  const [email,setEmail] = useState(userDetails.data.email)
  const [password,setPassword] = useState(userDetails.data.password)
  const navigate = useNavigate()

  const submitProfile = async(e) =>{
  e.preventDefault()
     try{
      const config ={
        headers:{
          'Content-type':'application/json'
        }
      }
      const response = await axios.post("https://chat-server-djx9ar71a-arjun-t-vs-projects.vercel.app/profileUpdate",{
        userName:userName,
        email:email,
        password:password,
        userId:userDetails.data._id
      },config)
      localStorage.setItem('userDetails',JSON.stringify(response))
       console.log('update respone',response.data)
       navigate('/app/welcome',{state:{message:response.data.message}})
     }
     catch(error){
      console.log(error.message)
     }
  }
  
  return (
    <div className="main-container">
       <form action="" className ="login-box" onSubmit={submitProfile}>
      <div className="login-box">
        <h4>Update your Profile Here</h4>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          name="userName"
          value={userName}
          required
          onChange={(e)=>setUserName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          onChange={(e)=>setEmail(e.target.value)}
          variant="outlined"
          name="email"
          value={email}
          required
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(e)=>setPassword(e.target.value)}
          name="password"
          type="password"
          value={password}
          required
        />
        <Button variant="contained" type="submit">Update</Button>
      </div>
      </form>  
    </div>
  );
}

export default Profile;
