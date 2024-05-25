import Allmusic from "../cardcontanint/Index"
import Bar from "../musicPlayerBar/bar";
import "bootstrap/dist/css/bootstrap.css";
import SideBar from "../sideBar/SideBar"; import * as React from 'react';
import Box from '@mui/material/Box';
import { Outlet, Route, Switch } from "react-router-dom";

function Home() {

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
      </Box>
      <Bar />
      <Outlet/>
    </>
  )
}

export default Home