import { Box, Toolbar, Typography } from "@mui/material";
import ProgressBar from "./ProgressBar";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import React, { useState, useRef, useEffect } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";


const MusicPlayerBar = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    setDuration(audio.duration)
    setCurrentSongIndex(localStorage.getItem("currentSongIndex"))
  }, [])

  console.log(currentSongIndex)

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      const updateProgress = () => {
        setCurrentTime(audio.currentTime);
      };
      const intervalId = setInterval(updateProgress, 100);
      return () => clearInterval(intervalId);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setDuration(audio.duration)
    } else {
      audio.play();
      setDuration(audio.duration)
    }
    setIsPlaying(!isPlaying);
  };

  const prev = () => {
    const audio = audioRef.current;

    if (currentSongIndex <= 0) {
      setCurrentSongIndex(currentSongIndex)
    }
    else {
      setCurrentSongIndex(currentSongIndex - 1)
      setDuration(audio.duration)
    }
  }

  const next = () => {
    const audio = audioRef.current;

    if (currentSongIndex >= songs.length - 1) {
      setCurrentSongIndex(currentSongIndex)
    }
    else {
      setCurrentSongIndex(currentSongIndex + 1)
      setDuration(audio.duration)
    }
  }

  const formattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`
  };


  return (
    <div style={{ padding: "0 0rem",zIndex:"99", display: "flex", width: "100%", justifyContent: "space-between", flex: "wrap" }}>
      <audio ref={audioRef}  src={songs[currentSongIndex].url} onPlaying={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} />
      <Box style={{ justifyContent: "row", display: "flex", width: "30%" }} >
        <img className="mx-3 rounded-4" src={songs[currentSongIndex].img} />
        <Box >
          <Typography color="#fff" variant="h5">{songs[currentSongIndex].title}</Typography>
          <Typography color="#fff" variant="p">{songs[currentSongIndex].artist}</Typography>
        </Box>
      </Box>
      <Box style={{ display: "flex", flexDirection: "column", width: "49%" }}>
        <Toolbar>
          <div  onClick={prev}><SkipPreviousRoundedIcon  fontSize="large" c sx={{ color: "#fff" }}/></div>
          <div onClick={togglePlay}>{isPlaying ?<PauseCircleFilledIcon className=" m-3"  sx={{ color: "#fff" }} fontSize="large" /> : <PlayCircleIcon className=" m-3"  fontSize="large" c sx={{ color: "#fff" }}  /> }</div>
          <div onClick={next}><SkipNextRoundedIcon sx={{ color: "#fff" }} fontSize="large" /></div>
        </Toolbar>
        <Box >
          <Box className="me-1 d-flex" width={"100%"} >
            <span style={{color:"#fff"}} >{formattedTime(currentTime)}</span>
            <ProgressBar currentTime={currentTime} duration={duration} />
            <span style={{color:"#fff"}} >{formattedTime(duration)}</span>
          </Box>
        </Box>
      </Box>
      <Toolbar>
        <div className="btn btn-primary"><FavoriteOutlinedIcon/></div>
      </Toolbar>
    </div>
  );
};




export default MusicPlayerBar;
