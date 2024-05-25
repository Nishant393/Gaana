import React, { useContext, useState } from 'react'
import axios from 'axios'
import {  useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from '../App';
import {Alert, AppBar, Box, Toolbar, Typography,TextField } from '@mui/material';
import "bootstrap/dist/css/bootstrap.css";

function Login() {
  const [err, setErr] = useState([])
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const isAboveMediumScreens = useMediaQuery("(min-width: 1100px)");
  
  const { state, dispatch } = useContext(userContext)

  const navigate = useNavigate();

  const handelChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const getData = (data) => {
    localStorage.setItem("userId", data._id)
  }

  const handelLogin = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/user/login", formData)
      .then((res) => {
        getData(res.data)
        console.log(res.data)
        dispatch({ type: "USER", payload: true })
        navigate("/")
      })
      .catch((e) => {
        setErr(e)
        navigate("/login")
      })
    setFormData({
      email: "",
      password: "",
    })
    
  }

  return (
    <div style={{ backgroundColor: "#121212;", height: "100vh",width:"100vw" }} >
      <AppBar className='d-flex flex-row' color="transparent">
        <i style={{ color: "#fff", fontSize: "2rem", margin: "0 1rem" }} class="bi bi-spotify"></i>
        <Typography variant='h4' color={"#fff"} >spotify</Typography>
      </AppBar>
      <Toolbar />
      <Box style={isAboveMediumScreens ? {width:"30vw"} : {width:"90vw"}  } className="d-flex container flex-column " >
        <h1 style={{color:"#fff"}} >Log in to Spotify</h1>
        <Alert className={err.message ? "error" : "pop"} severity="error">{err.message}</Alert>
          <Box style={{justifyContent:"center",margin:"1rem 0rem"}} className="d-flex flex-column ">
            <span style={{color:"#fff"}}>Email or username</span>
            {/* <input
              type='email'
              name='email'
              onChange={handelChange}
              value={formData.email}
            /> */}
            <TextField id="outlined-basic"type='email' name='email'onChange={handelChange} value={formData.email} label="Email or username" variant="outlined" style={{backgroundColor:"#424242",color:"#000"}}/>
          </Box>
          <Box style={{justifyContent:"center",margin:"1rem 0rem"}} className="d-flex flex-column ">
            <span style={{color:"#fff"}}>password</span>
            {/* <input
              name="password"
              onChange={handelChange}
              type='password'
              value={formData.password}
            /> */}
            <TextField name="password"
              onChange={handelChange}
              type='password'
              value={formData.password} label="Email or username" variant="outlined" style={{backgroundColor:"#424242",color:"#000"}}/>
          </Box>
          <button className='btn' style={{color:"#000", backgroundColor:"#1ed760"}} onClick={handelLogin} type='submit'>Login</button>
          <a style={{color:"#1ed760",margin:"1rem 0rem"}}>forgot your password?</a>
          <br/>
          {/* <hr style={{backgroundColor:"#424242"}} /> */}
          <Box>
            <span style={{color:"#424242"}} >Don't have an account?</span>
            <Link to='/register' style={{color:"#fff"}} >Sign up for Spotify</Link>
          </Box>
      </Box>
    </div>
  )
}

export default Login