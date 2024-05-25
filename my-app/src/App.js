import React, { createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./login/register";
import Login from "./login/Login"
import Home from "./home/Home";
import Profile from "./Profile/Profile";
import { userReducer, intialState } from "./saveData";
import SideBar from "./sideBar/SideBar";
import Allmusic from "./cardcontanint/Index";
import Parent from "./serch/Parent";
import CurrentMusic from "./cardcontanint/CurrentMusic";

export const userContext = createContext()

const App = () => {
  const [state, dispatch] = useReducer(userReducer, intialState)
  return (
    <div className="App" style={{backgroundColor:"#000"}} >{/*//#212121*/}
      <userContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} >
              <Route index element={<Allmusic/>} />
              <Route path="profile" element={<Profile/>} />
              <Route path="serch" element={<Parent/>} />
              <Route path="currentmusic" element={<CurrentMusic/>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;


// UGOertF9wtpB7EuV 