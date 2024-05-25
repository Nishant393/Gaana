import React,{useSta} from 'react'
import { LinearProgress } from '@mui/material';

const ProgressBar = ({ currentTime, duration }) => {
    const progress = Math.min((currentTime / duration) * 100, 100);
    return (
      <div className='mt-2 me-2' style={{backgroundColor:'#212121',width:"100%",height:"8px",border:"#212121 solid 0.5px ", borderRadius:"15px"}} >
        <div style={{backgroundColor:'#fff',width:`${progress}%`,height:"7px"}}>

        </div>
      </div>
    )
  }

export default ProgressBar