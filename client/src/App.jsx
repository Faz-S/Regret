import React from 'react'
import styled from'styled-components'
import Home from './pages/Home'
import {BrowserRouter as Router} from 'react-router-dom'
import Animated from './components/Animated'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
function App() {
  
  return (
    
    <Router>
      <Animated/>
    </Router>
    
      

  )
}

export default App
