import React from 'react'
import { Route,Routes,useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Regrets from '../pages/Regrets'
import { AnimatePresence } from 'framer-motion'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Chat from './ui/Chatbot'
import AIInput_08 from './ui/Voice'
import Chatbot from '../pages/Chatbot'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;
function Animated() {
    const location = useLocation();
    return (
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
            <Route index element={<Login/>}/>
            <Route path="/Regrets" element={<Regrets/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Chatbot" element={<Chat/>}/>
      </Routes>
      </AnimatePresence>
      
    
  )
}

export default Animated
