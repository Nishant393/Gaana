// import React, { useEffect, useState } from 'react'
import MusicPlayerBar from './music'
// import Aankhon_Mein_Teri from "../music/Aankhon_Mein_Teri.mp3"
import { AppBar, Box, Toolbar } from '@mui/material'
import "bootstrap/dist/css/bootstrap.css";
import List from '../music/List';


function Bar() {

  return (
      <Box className='p-1' style={{backgroundColor:"#000",position:"fixed",width:"100%", top:"86vh"  ,  minHeight:" 100vh",
      marginTop: "auto"}}>
          <MusicPlayerBar  className="flex" songs={List} />
      </Box>
  )
}

export default Bar