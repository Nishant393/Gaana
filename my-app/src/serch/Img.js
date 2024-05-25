import "./style.css"
import { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { Link, Toolbar, useMediaQuery } from "@mui/material";
import List from '../music/List';
import CurrentMusic from "../cardcontanint/CurrentMusic";


let drawerWidth = 350;


function Img({ Data }) {
    const [element, setElement] = useState(0)
    const navigate = useNavigate()
    useState(()=>{
        localStorage.setItem("currentMusic",element)
    })
    
    
    const isAboveMediumScreens = useMediaQuery("(min-width: 700px)");
    const isAboveScreens = useMediaQuery("(min-width: 900px)");
    if (isAboveScreens) { drawerWidth = 400 }
    else if (isAboveMediumScreens) { drawerWidth = 400 }
    else { drawerWidth = 0 }
    return (
        <div sx={{ height: "100vh" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", width: `calc(100% - ${drawerWidth}px)`, zIndex: "99", marginLeft: `${drawerWidth}px` }}>
                {Data.map((value, index) => {
                    return (
                        <Box onClick={()=>{ 
                            // navigate("/currentmusic")
                            setElement(index)}} key={value.title} sx={{width: '11rem', bgcolor: "#3c3c3c", cursor:"pointer" , padding: "2px", borderRadius: "5px", margin: "0 1rem 1rem 0" }}>
                            <Box style={{ backgroundImage: `url(${value.img})`, height: "11rem", width: '11rem', backgroundSize: "11rem 11rem", borderRadius: "10px" }}>
                            </Box>
                            <Typography variant='h6' color={"#fff"} >{value.title}</Typography>
                            <Typography variant='para ' >{value.artist}</Typography>
                        </Box>)
                })}
                <Toolbar />
            </Box>
        </div>
    )
}

export default Img;