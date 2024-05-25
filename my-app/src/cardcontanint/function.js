import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Drawer } from '@mui/material'
import { Link, useMatches } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import List from '../music/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { userContext } from '../App';
import "../index.css"
import { NavLink } from 'react-router-dom';
import CurrentMusic from './CurrentMusic';

let drawerWidth = 310;

// function Allmusic() {

  const [open, setOpen] = useState(false);
  const [playMusic, setPlayMusic] = useState(0);
  const { state, dispatch } = useContext(userContext)
  const [element,setElement]=useState(0)


useEffect(()=>{
  localStorage.setItem("currentMusic",element)
  localStorage.setItem("currentSongIndex",playMusic)
})

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  
  const logout = () => {
    dispatch({ payload: false })
    localStorage.removeItem("userId")
  }

  const isAboveMediumScreens = useMediaQuery("(min-width: 700px)");
  const isAboveScreens = useMediaQuery("(min-width: 900px)");
  if (isAboveScreens) { drawerWidth = 400 }
  else if (isAboveMediumScreens) { drawerWidth = 400 }
  else { drawerWidth = 0 }

  const isLogin = (
    < Box >
      <Link href={'/register'} className='btn ' style={{ color: "#e0e0e0" }} >
        Sign up
      </Link>
      <Link href={'/login'} className={isAboveMediumScreens ? "btn m-3" : ""} style={{ color: "#000", backgroundColor: "#fff" }} >
        Log in
      </Link>
    </Box >
  )


    <Box style={{ display: "flex" }} >
      <Link href={'/login'} onClick={logout} className={isAboveMediumScreens ? "btn m-3" : ""} style={{ color: "#000", backgroundColor: "#fff" }} >
        Log out
      </Link>
      <Box sx={{ height: "40px", width: "40px", borderRadius: "50%", marginTop: "10px", backgroundColor: "#e91e63" }} />
    </Box>
  )

  const DrawerList = (
    <Box className='container'  >
      {/* <button onClick={()=>setOpen(false)}>close drawer</button> */}
      <List  >
        <NavLink style={{ color: '#fff' }} to={"/register"}>
          Sign In
        </NavLink>
        <br />
        <br />
        <NavLink style={{ color: '#fff' }} to={"/login"}>
          Login
        </NavLink>
        <hr style={{ size: 4, color: "#fff", backgroundColor: "#fff" }} />

        <NavLink style={{ color: '#fff' }} to={"/"}>
          Home
        </NavLink>
        <br />
        <br />
        {state ?
          <NavLink style={{ color: '#fff' }} to={"/profile"}>
            Profile
          </NavLink>:<Box/>}
        {state ?
          <NavLink style={{ color: '#fff' }} onClick={logout}   >
            <br />
            <br />
            Log out
          </NavLink>
          :
          <Box/>
        }
        <hr style={{ size: 4, color: "#fff", backgroundColor: "#fff" }} />

        <Box style={{ display: "flex", flexDirection: 'column' }} className='d-flex'>
          <a style={{ color: "#fff", margin: "0 13px" }} href='https://www.spotify.com/in-en/legal/end-user-agreement/' >Legal</a>
          <a style={{ color: "#fff", margin: "0 13px" }} href='https://www.spotify.com/in-en/safetyandprivacy/' >Safety & Privacy Center</a>
          <a style={{ color: "#fff", margin: "0 13px" }} href='https://www.spotify.com/in-en/legal/privacy-policy/' >Privacy Policy</a>
          <a style={{ color: "#fff", margin: "0 13px" }} href='https://www.spotify.com/in-en/accessibility' >Accessibility</a>
        </Box>
      </List>
    </Box>
  );


  return (
    <div className='' style={{ backgroundColor: "#212121", width: `calc(100% - ${drawerWidth}px)`, marginLeft: `${drawerWidth}px` }}>
      <AppBar
        position="fixed"
        sx={{ boxShadow: "0", backgroundColor: " #3c3c3c", width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, }}
      >
        <Toolbar className='d-flex justify-content-between'>
          <Typography variant="h6" noWrap component="div">
            logo
          </Typography>
          {isAboveMediumScreens ? state ? isLogout : isLogin
            :
            <Box>
              <button sx={{ color: "#fff" }} onClick={()=>setOpen(false)} >openn</button> 
               <Drawer className='' open={open} anchor={'right'} sx={{
                '& .MuiDrawer-paper': {
                  width: "100%",
                  backgroundColor: "rgba(0, 0 ,0 ,.9 )",
                  boxSizing: 'border-box',
                }, width: "100%"
              }} onClose={()=>setOpen(false)}>
                {DrawerList}
              </Drawer>
            </Box>
          }
        </Toolbar>
        <Box>
          <Link href={'/login'} className={isAboveMediumScreens ? "btn m-3" : ""} style={{ borderRadius: "20px", color: "#000", backgroundColor: "#fff" }} >
            All
          </Link>
          <Link href={'/login'} className={isAboveMediumScreens ? "btn m-3" : ""} style={{ borderRadius: "20px", color: "#000", backgroundColor: "#fff" }} >
            Liked
          </Link>
        </Box>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `100` }}
      >
        <Toolbar />
        <Toolbar />
        <Typography variant='h5' color={"#fff"}>Popular songs</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
          {List.map((value,index) => {
            return (
              <Box  onMouseOver={ ()=>{setElement(index)}} key={value.title} sx={{ bgcolor: "#3c3c3c",cursor:"pointer", padding: "2px",width: '11rem', borderRadius: "5px", margin: "0 1rem 1rem 0" }}>
                <Link to="/currentmusic" sx={{textDecoration: "none" }}>
                <Box  style={{ backgroundImage: `url(${value.img})`, height: "11rem", width: '11rem', backgroundSize: "11rem 11rem", borderRadius: "10px" }} display={"flex"} justifyContent={"flex-end"}>
                <Box bgcolor={"#76ff03"} onClick={()=>setPlayMusic(element)}  className="mt-2 playBtn" height={"3rem"} borderRadius={"50%"} width={"3rem"}>
                    <PlayArrowIcon  className="m-2" sx={{ color: "#000" }} fontSize="large" />
                </Box>
                </Box>
                <Typography  variant='h6' color={"#fff"} >{value.title}</Typography>
                <Typography variant='para '  color={"#0091ea"} >{value.artist}</Typography>
              </Link>
              </Box>)
          })}

        </Box>
        </Box>
        <Toolbar/>
    </div>
  )
}

export default Allusic