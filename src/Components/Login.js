import { Button, TextField } from "@mui/material";
import React from "react";
import "./MainStyles.css";
import homeLogo from "../images/homeLogo.jpg"
function Login() {
  return (
    <div className="main-container">
      <div className="sideBar">
      <img src={homeLogo} alt="" />
      </div>
      <div className="login-box">
        <h4 className="text-success">Login With Your Username and Password</h4>
        <TextField id="outlined-basic" label="Username" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" />
        <Button variant="contained">Login</Button>
      </div>
    </div>
  );
}

export default Login;
