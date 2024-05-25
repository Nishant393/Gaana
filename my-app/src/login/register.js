import React, { useState } from 'react'
import axios from "axios"
import "../index.css"
import { Alert, useMediaQuery } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, TextField } from '@mui/material';

function Register() {

  const [err, setErr] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const isAboveMediumScreens = useMediaQuery("(min-width: 1100px)");

  const navigate = useNavigate();

  const handelChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handelSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/user/signup', formData)
      .then((response) => {
        setErr(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error)
        navigate("/register");
      });
    setFormData({
      name: "",
      email: "",
      password: "",
    })
  }

  console.log(err)

  return (
    <div style={{ backgroundColor: "#121212;", height: "100vh", width: "100vw" }} >
      <AppBar className='d-flex flex-row' color="transparent">
        <i style={{ color: "#fff", fontSize: "2rem", margin: "0 1rem" }} class="bi bi-spotify"></i>
        <Typography variant='h4' color={"#fff"} >spotify</Typography>
      </AppBar>
      <Toolbar />
      <form onSubmit={handelSubmit} style={isAboveMediumScreens ? { width: "30vw" } : { width: "90vw" }} className="d-flex container flex-column " >
        <h1 style={{ color: "#fff" }} >Sign in to Spotify</h1>
        <Alert className={err.message ? "error" : "pop"} severity="error">{err.message}</Alert>
        <Box style={{ justifyContent: "center", margin: "1rem 0rem" }} className="d-flex flex-column ">
          <span style={{ color: "#fff" }}> username</span>
          <TextField id="outlined-basic" type='name' name='name' onChange={handelChange} value={formData.name} label="username" variant="outlined" style={{ backgroundColor: "#424242", color: "#000" }} />
        </Box>
        <Box style={{ justifyContent: "center", margin: "1rem 0rem" }} className="d-flex flex-column ">
          <span style={{ color: "#fff" }}>Email</span>
          <TextField name="email"
            onChange={handelChange}
            type='email'
            value={formData.email} label="Email " variant="outlined" style={{ backgroundColor: "#424242", color: "#000" }} />
        </Box>
        <Box style={{ justifyContent: "center", margin: "1rem 0rem" }} className="d-flex flex-column ">
          <span style={{ color: "#fff" }}>Password</span>
          <TextField name="password"
            onChange={handelChange}
            type='password'
            value={formData.password} label="Password" variant="outlined" style={{ backgroundColor: "#424242", color: "#000" }} />
        </Box>
        <button className='btn' style={{ color: "#000", backgroundColor: "#1ed760" }} onClick={handelSubmit} type='submit'>Sign In</button>
        <a style={{ color: "#1ed760", margin: "1rem 0rem" }}>forgot your password?</a>
        <br />
        {/* <hr style={{backgroundColor:"#424242"}} /> */}
        <Box>
          <span style={{ color: "#424242" }} >Don't have an account?</span>
          <NavLink to={"/login"} style={{ color: "#fff" }} >Login up for Spotify</NavLink>
        </Box>
      </form>
    </div>
  )
}

export default Register