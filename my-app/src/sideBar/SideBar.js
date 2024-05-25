import React from 'react';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Serch from './Serch';
import {  useMediaQuery } from "@mui/material";
import "../index.css"
 


let drawerWidth = 310;
function SideBar() {
  const isAboveMediumScreens = useMediaQuery("(min-width: 700px)");
  isAboveMediumScreens ? drawerWidth=310 :drawerWidth=0
  return (
    // <Drawer
    //   sx={{
    //     width: drawerWidth,
    //     flexShrink: 0,
    //     '& .MuiDrawer-paper': {
    //       width: drawerWidth,
    //       boxSizing: 'border-box',
    //     },
    //   }}
    //   variant="permanent"
    //   anchor="left"
    // >

    <Box className={ isAboveMediumScreens ? "":"none"} style={{
      width: drawerWidth,
      height: "100%",
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
      position:"fixed"
    }}  
    >
      <Toolbar />
      <Divider />
      <Serch/>
    </Box>
    // </Drawer>
  )
}

export default SideBar




// shela topi langot flower 