// // // src/components/Login.js
// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [message, setMessage] = useState("");
// //   const navigate = useNavigate();
// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post("http://localhost:8000/user/login", {
// //         email,
// //         password,
// //       });
// //       setMessage(response.data.message);
// //       navigate('/Home')
// //       console.log(response.data.user); // Save user info or token if necessary
// //     } catch (error) {
// //       setMessage(error.response.data.message || "Login failed");
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       <form onSubmit={handleLogin}>
// //         <div>
// //           <label>Email:</label>
// //           <input
// //           className="text-black"
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Password:</label>
// //           <input
// //           className="text-black"
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <button type="submit">Login</button>
// //       </form>
// //       {message && <p>{message}</p>}
// //     </div>
// //   );
// // }

// // export default Login;
// // src/components/Login.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components"
// import transition from "../transition";
// import { SpotlightPreview } from "../components/ui/SpotlightDemo";
// // import React from "react";
// // import { cn } from "../lib/utils";
// // import { Spotlight } from "../components/ui/Spotlight.js"

// // export function SpotlightPreview() {
// //   return (
// //     (<div
// //       className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
// //       <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
// //       <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
// //         <h1
// //           className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
// //           Spotlight <br /> is the new trend.
// //         </h1>
// //         <p
// //           className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
// //           Spotlight effect is a great way to draw attention to a specific part
// //           of the page. Here, we are drawing the attention towards the text
// //           section of the page. I don&apos;t know why but I&apos;m running out of
// //           copy.
// //         </p>
// //       </div>
// //     </div>)
// //   );
// // }

// const Container = styled.div`
// height:100vh;
//    background: #000000; /* fallback for old browsers */
//   background: -webkit-linear-gradient(to right, #000000, #434343); /* Chrome 10-25, Safari 5.1-6 */
//   background: linear-gradient(to right, #000000, #434343);
// `
// function Login() {


//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:8000/user/login", {
  //       email,
  //       password,
  //     });

  //     // Check if the response contains a token and store it in localStorage
  //     if (response.data.token) {
  //       localStorage.setItem('token', response.data.token);
  //       console.log('Token stored:', response.data.token);
  //     } else {
  //       console.warn('No token received');
  //     }

  //     setMessage(response.data.message || "Login successful");
  //     navigate('/Home');
  //   } catch (error) {
  //     setMessage(error.response?.data?.message || "Login failed");
  //     console.error("Login error:", error);
  //   }
  // };

//   return (
//     <Container>
      
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             className="text-black"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             className="text-black"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </Container>
//   );
// }

// export default transition(Login);
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Context } from '../context/Context';
// import { FaCamera } from "react-icons/fa";
// import { FaPencilAlt } from "react-icons/fa";
// import { FaFile } from "react-icons/fa";
// import { MdFileUpload } from "react-icons/md";
// import Js from '../assets/javascript.png';

// import C from '../assets/C_Logo.png'
// import python from '../assets/python.png';
// import html from '../assets/html.png';
// import Modal from '../ui/Modal';
// import { AnimatedBeam } from '../ui/AnimatedBeam.jsx';
// import { AnimatedBeam } from '../ui/Animation.jsx';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // padding:2rem;
  // padding-left:5rem;
  // padding-top:1rem;
  height: 100vh;
  width: 100%;
  // background: linear-gradient(120deg, #1E3A5F, #2B4A77); 
  // background: linear-gradient(45deg, #004D4D, #009999);
   background:#000;
  //  gap:3rem;
  
`;

const SubContainer = styled.div`
    // background: linear-gradient(45deg, #004D4D, #009999);
    background:#000;
 /* Semi-transparent white */
  backdrop-filter: blur(10px); /* Frosted glass effect */
  border: 1px solid #fff;
   /* Light border for glass effect */ 
  min-height: 50vh;
  // padding:2rem;
  width: 30rem;
  
  border-radius: 2rem;
  // box-shadow: 0 0 9px 1px #fff;
  -webkit-backdrop-filter: blur(10px); /* Support for Safari */
`;


const Input = styled.input`
  width: 70%;
  padding: 7px;
  margin: 1rem 0 1rem 0;
  // background: rgba(255, 255, 255, 0.1); /* Semi-transparent white */
  outline: none;
  // background: linear-gradient(45deg, #004D4D, #009999);
  background:#000;
  
`;


const InputHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  width: 70%;
  height: 60px;
  padding: 10px;
  margin: 1rem 0 0.5rem 0;
  border-radius: 29px;
  background: linear-gradient(45deg, #004D4D, #009999);
  background:#fff;
  
  color: #000;
  font-weight: bolder;
  font-size: 20px;
  transition: all 0.4s ease;
  &:active {
    transform: scale(0.9);
  }
`;

const Span = styled.span`
  padding: 0 0 4px 7px;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
`;

const Button3=styled.button`
  width: 70%;
  height: 60px;
  padding: 10px;
  margin: 2rem 0 0.5rem 0;
  border-radius: 29px;
  // background: linear-gradient(45deg, #004D4D, #009999);
  background:#fff;
  border:1px solid #009999;
  
  font-weight: bolder;
  font-size: 17px;
  transition: all 0.4s ease;
  &:active {
    transform: scale(0.9);
  }
`;
  
const Login = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errmsg, setErrmsg] = useState('');
  const [showerrmsg, setShowErrmsg] = useState(false);
  const [allerrmsg, setallErrmsg] = useState('');
  
  const [open, setOpen] = useState(false)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {   
      await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });
      
      alert("login success")
      navigate('/Home');
      // Check if the response contains a token and store it in localStorage
      // if (response.data.token) {
      //   localStorage.setItem('token', response.data.token);
      //   console.log('Token stored:', response.data.token);
      // } else {
      //   console.warn('No token received');
      // }

      // setMessage(response.data.message || "Login successful");
      
    } catch (error) {
      // setMessage(error.response?.data?.message || "Login failed");
      alert("Login error:", error);
    }
  };

  return (
    <Container style={{fontFamily:"Neue"}} >     
      <SubContainer >
        <p className="" style={{ fontSize: '40px', fontWeight: 'bolder', textAlign: 'center', padding: '1rem 0' }}>
          Login
        </p>
        <div className='bg-black flex flex-col items-center p-[1rem] gap-2 rounded-full'>
          <input
            className='w-full text-xl text-center bg-black py-3 px-5 outline-none border-t-[1px]'
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrmsg(false);
              setallErrmsg('');
            }}
            onKeyDown={handleKeyPress}
          />
          {!email && (
            <p style={{ textAlign: "left", width: "70%", padding: "0" }}>{errmsg}</p>
          )}
          <input
            className='w-full text-xl text-center bg-black py-3 px-5 outline-none border-b-[1px]'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrmsg(false);
              setallErrmsg('');
            }}
            onKeyDown={handleKeyPress}
          />
          {!password && (
            <p style={{ textAlign: "left", width: "70%", padding: "0" }}>{errmsg}</p>
          )}
          <Button  onClick={handleLogin}>
            Login
          </Button>
          {allerrmsg && (
            <p style={{ margin: "1rem 0 0 0",color:"red" }}>{allerrmsg}</p>
          )}
          <p style={{ padding: "1.5rem" }} className='text-xl'>
            Don't have an account? <Span onClick={() => navigate('/Register')}>Register</Span>
          </p>
        </div>
        
        </SubContainer>
    
    </Container>
  );
};

export default Login;
