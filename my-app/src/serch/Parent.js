import React, { useState } from 'react'
import Img from './Img'
import { AppBar, Box, Input, InputAdornment, Toolbar, Button, Typography, colors } from '@mui/material/';
import {useMediaQuery} from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import List from '../music/List';



let drawerWidth = 310;



const filterVideos = (videos, searchTerm) => {
  return videos.filter((video) => {
    return (video.title.toLowerCase().includes(searchTerm.toLowerCase()))
  });
};

export default function Parent() {

  const [text, setText] = useState("")

  const isAboveMediumScreens = useMediaQuery("(min-width: 700px)");
  const isAboveScreens = useMediaQuery("(min-width: 900px)");
  if (isAboveScreens) { drawerWidth = 400 }
  else if (isAboveMediumScreens) { drawerWidth = 400 }
  else { drawerWidth = 0 }


  const filterVideo = filterVideos(List , text)

  return (
    <div>
      <AppBar position="relative" sx={{display:"flex",justifyContent:"end", backgroundColor: "#fff",width: `calc(100% - ${drawerWidth}px)`, marginLeft: `${drawerWidth}px` }}>
          <Input className='p-2'  sx={{ border: "2px solid blue" }}
            id="input-with-icon-adornment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
      </AppBar>
      <Toolbar/>
      <Img  Data={filterVideo} />
    </div>
  )
}
