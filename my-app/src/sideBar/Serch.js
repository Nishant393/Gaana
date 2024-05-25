import { Box, Toolbar, Typography } from '@mui/material'
import { useMediaQuery } from "@mui/material";
import { Link, useMatches } from "react-router-dom";
import React, { useContext } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Parent from '../serch/Parent';
import SearchIcon from '@mui/icons-material/Search';
import { userContext } from '../App';

let drawerWidth = 400

export default function Serch() {
  const isAboveMediumScreens = useMediaQuery("(min-width: 700px)");
  const { state, dispatch } = useContext(userContext)

  isAboveMediumScreens ? drawerWidth = 400 : drawerWidth = 0
  return (
    <>
      <Box width={`${drawerWidth}`} bgcolor={"#212121"} className=" m-3 p-2 rounded-2" >
        <Toolbar height="30%">
          <OtherHousesIcon fontSize="large" className='me-3' sx={{ color: "#fff" }} />
          <Link
            to="/"
            sx={{ color: "#fff", textDecoration: "none" }}
          >
            <Typography variant='h5' sx={{ textDecoration: "none", color: "#fff" }}>
              Home
            </Typography>
          </Link>
          <br />
        </Toolbar>
        <Toolbar>
          <SearchIcon fontSize="large" className='me-3' sx={{ color: "#fff" }} />
          <Link
            to="/serch"
            sx={{ color: "#fff", textDecoration: "none" }}
          >
            <Typography variant='h5' sx={{ textDecoration: "none", color: "#fff" }}>
              Serch
            </Typography>
          </Link>
        </Toolbar>
        {state ?
          <Toolbar>
            <AccountCircleIcon fontSize="large" className='me-3' sx={{ color: "#fff" }} />
            <Link
              to={"/profile"}
              sx={{ color: "#fff", textDecoration: "none" }}
            >
              <Typography variant='h5' sx={{ color: "#fff" }} >
                Profile
              </Typography>
            </Link>
          </Toolbar> :
          <Box />
        }
      </Box>
      <Box width={"90%"} height={"40%"} bgcolor={"#212121"} className=" m-3 p-2 rounded-2" >
        <Toolbar>
          <Typography variant='h5' sx={{ color: "#fff" }} >
            Liked Songs
          </Typography>
        </Toolbar>
      </Box>
    </>
  )
}
