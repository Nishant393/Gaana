import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Drawer } from '@mui/material'
import { Link, useMediaQuery } from "@mui/material";
import List from '../music/List';
import "bootstrap/dist/css/bootstrap.css";
import ListItemButton from '@mui/material/ListItemButton';
import { userContext } from '../App';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import { NavLink } from 'react-router-dom';

let drawerWidth = 310;

function CurrentMusic() {

    const [open, setOpen] = useState(false);
    const [element, setElement] = useState(0);
    const { state, dispatch } = useContext(userContext)
    const [playMusic, setPlayMusic] = useState(0);

    useEffect(() => {
        setElement(localStorage.getItem("currentMusic"))
        localStorage.setItem("currentSongIndex",playMusic)
    })
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const logout = () => {
        dispatch({ payload: false })
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


    const isLogout = (
        <Box style={{ display: "flex" }} >
            <Link href={'/login'} onClick={logout} className={isAboveMediumScreens ? "btn m-3" : ""} style={{ color: "#000", backgroundColor: "#fff" }} >
                Log out
            </Link>
            <Box sx={{ height: "40px", width: "40px", borderRadius: "50%", marginTop: "10px", backgroundColor: "#e91e63" }} />
        </Box>
    )

    const DrawerList = (
        <Box className='container' role="presentation" >
            <button onClick={toggleDrawer(false)}>close drawer</button>
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
                    </NavLink> : <Box />}
                {state ?
                    <NavLink style={{ color: '#fff' }} onClick={logout}   >
                        <br />
                        <br />
                        Log out
                    </NavLink>
                    :
                    <Box />
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
        <div className='' style={{ backgroundColor: "#3c3c3c", width: `calc(100% - ${drawerWidth}px)`, marginLeft: `${drawerWidth}px` }}>
            <AppBar
                position="fixed"
                sx={{ boxShadow: "0", backgroundColor: "#00695c", width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, }}
            >
                <Toolbar className='d-flex justify-content-between'>
                    <Typography variant="h6" noWrap component="div">
                        logo
                    </Typography>
                    {isAboveMediumScreens ? state ? isLogout : isLogin
                        :
                        <Box>
                            <ListItemButton sx={{ color: "#fff" }} onClick={toggleDrawer(true)} />
                            <Drawer className='' open={open} anchor={'right'} sx={{
                                '& .MuiDrawer-paper': {
                                    width: "100%",
                                    backgroundColor: "rgba(0, 0 ,0 ,.9 )",
                                    boxSizing: 'border-box',
                                }, width: "100%"
                            }} onClose={toggleDrawer(false)}>
                                {DrawerList}
                            </Drawer>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Box
                component="main"
                sx={{ display: "flex", backgroundColor: "#26a69a", flexGrow: 1, p: 3, width: `100` }}
            >
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ borderRadius: "50px", padding: "10px", margin: "0 2rem 0 0 ", height: "11rem", width: "11rem" }} >
                        <img src={List[element].img} style={{ borderRadius: "10px", padding: "5px", height: "11rem", width: "11rem" }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <Typography variant='h5' color={"#fff"}>Prodcast Music</Typography>
                        <Typography variant='h2' color={"#fff"}> {List[element].title}</Typography>
                        <Typography variant='h4' color={"#fff"}> {List[element].artist}</Typography>
                    </Box>
                </Box>
            </Box>
            <Toolbar sx={{ display: "flex", flexDirection: "column", alignItems: 'flex-start', backgroundImage: " linear-gradient(#009688, #3c3c3c)" }} >
                <Typography variant='para' color={"#b3e5fc"}>{List[element].releaseDate}</Typography>
                <Box bgcolor={"#76ff03"} sx={{cursor:"pointer"}} onClick={()=>setPlayMusic(element)} className="mt-2" height={"5rem"} borderRadius={"50%"} width={"5rem"}>
                    <PlayArrowIcon  className="m-4" sx={{ color: "#000" }} fontSize="large" />
                </Box>
                <Typography variant='h5' color={"#fff"}>Music Description</Typography>
                <Typography variant='para' width={"60%"} color={"gray"}>{List[element].discription}</Typography>
            </Toolbar>

            {/*-----------------_________________raw---------------------=======*/}


            <hr style={{ size: 4, color: "#fff", backgroundColor: "#fff" }} />
            <Box style={{display:"flex"}}>
                <Box sx={{ height: "3rem", boxShadow: "5px 5px 10px #263238 ", width: "3rem", borderRadius: "50%", marginTop: "10px", backgroundColor: "#212121", margin: "10px", padding: "10px" }}>
                    <a href='https://www.instagram.com/spotify/'>
                        <InstagramIcon style={{ color: "#fff" }} />
                    </a>
                </Box>
                <Box sx={{ height: "3rem", boxShadow: "5px 5px 10px #263238 ", width: "3rem", borderRadius: "50%", marginTop: "10px", backgroundColor: "#212121", margin: "10px", padding: "10px" }}>
                    <a href='https://twitter.com/spotify'>
                        <TwitterIcon style={{ color: "#fff" }} />
                    </a>
                </Box>
                <Box sx={{ height: "3rem", boxShadow: "5px 5px 10px #263238 ", width: "3rem", borderRadius: "50%", marginTop: "10px", backgroundColor: "#212121", margin: "10px", padding: "10px" }}>
                    <a href='https://www.facebook.com/Spotify'>
                        <FacebookIcon style={{ color: "#fff" }} />
                    </a>
                </Box>
            </Box>

            <br />
            <br />
            <Box style={{ display: "flex" }}>
                <Toolbar>
                    <a style={{ color: "#fff", margin: "0 13px" }} href='https://www.spotify.com/in-en/legal/end-user-agreement/' >Legal</a>
                    <a style={{ color: "#fff", margin: "0 13px" }} href='https://www.spotify.com/in-en/safetyandprivacy/' >Safety & Privacy Center</a>
                    <a style={{ color: "#fff", margin: "0 13px" }} href='https://www.spotify.com/in-en/legal/privacy-policy/' >Privacy Policy</a>
                    <a style={{ color: "#fff", margin: "0 13px" }} href='https://www.spotify.com/in-en/accessibility' >Accessibility</a>
                </Toolbar>
                <Typography variant='h6' color="#fff" >© 2024 Spotify AB</Typography>
            </Box>
            <Toolbar />
        </div>
    )
}

export default CurrentMusic