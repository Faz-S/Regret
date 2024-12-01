import React , {useContext, useState} from 'react';
import GradualSpacing from "../components/ui/gradual-spacing";
import { delay, easeOut } from 'framer-motion';
import { ShimmerButton } from '../components/ui/ShimmerButton';
import ShinyButton from "../components/ui/ShinyButton";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import transition from '../transition';
import { Link } from 'react-router-dom';
import { TypewriterEffectSmooth } from "../components/ui/typing";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import SlideInNotifications from '../components/ui/slidingNotification';
import { generateRandomNotif } from '../components/ui/slidingNotification';
import { generateCommunityNotification } from '../components/ui/slidingNotification';
import { Context } from '../context/Context';
import axios from 'axios'
export function GradualSpacingDemo() {
  return (
    <GradualSpacing
      style={{ fontFamily: "Neue" }}
      className="font-display mt-2 text-center text-4xl font-bold -tracking-widest text-white dark:text-white md:text-5xl md:leading-[5rem] ls:text-3xl sm:text-[20px]"
      text="Type your regrets below"
    />
  );
}


export function ShimmerButtonDemo({ text,onClick }) {
  return (
    <div className="z-10 flex min-h-64 items-center justify-center">
      <ShimmerButton className="shadow-2xl " onClick={onClick} >
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          {text}
        </span>
      </ShimmerButton>
    </div>
  );
}


function Home() {
    
  const {input,setInput,message,setMessage,notifications,setNotifications}= useContext(Context)

  // const save = () => {
  //   if (input.trim()) {
  //     setNotifications((pv) => [generateRandomNotif(), ...pv]);
  //     const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
  //     savedMessages.push(input);
  //     localStorage.setItem('messages', JSON.stringify(savedMessages));
  //     setInput('');
  //     setMessage(input) // Clear input after posting
  //   }
    
    
  // }
  const save = async () => {
    if (input.trim()) {
      setNotifications((prev) => [generateRandomNotif(), ...prev]);
  
      try {
        // Make POST request to your backend API
        console.log("hi");
        const response = await axios.post("http://localhost:8000/journal/save", {
          description: input  // send input as description
        });
        
        console.log("Post saved:", response.data);
  
        setInput('');   // Clear the input after posting
        // setMessage(input); // Optional: Save the message locally
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };
  const post = async ()=> {
      if (input.trim()) {
        setNotifications((prev) => [generateCommunityNotification(), ...prev]);
        
    
        try {
          // Make POST request to your backend API
          console.log("ji")
          const response = await axios.post("http://localhost:8000/journal/post", {
            description: input  // send input as description
          });
          
          console.log("Posted to community:", response.data);
    
          setInput('');   // Clear the input after posting
          // setMessage(input); // Optional: Save the message locally
        } catch (error) {
          console.error("Error creating post:", error);
        }
      }
  }
  
    return (
      <>
      
    <motion.div 
    className='flex-col justify-center h-screen text-center font-thin' 
    >
      <div  className='flex w-full items-center justify-between px-10 pt-5 '>
        
        <div className='lg:text-3xl font-semibold sm:text-xl'>Post<span className='text-orange font-bold'> Nut</span> Clarity</div>
        
      </div>
      <div className='flex flex-col md:mt-0 sm:mt-10 justify-center items-center place-content-center '>
        <GradualSpacingDemo />
      </div>
      
      <div className='flex justify-center'>
        <motion.textarea
        onChange={(e)=>{
          setInput(e.target.value)
        }}
        value={input}
        initial={{opacity:0,y:100}}
        animate={{opacity:1,y:0}}
        transition={{duration:1,ease:"backInOut",delay:1}}
        placeholder="Type anywhere here" className='bg-black w-[32rem] text-xl text-center place-content-center h-[10rem] resize-none outline-none text-white caret-orange' />
      </div>
      
        <AnimatePresence mode='wait'>
            <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:1,ease:"easeOut",delay:2}}
            className='flex -mt-[3rem] items-center justify-center gap-5'>
                <SlideInNotifications onclick={save} />
                {/* <SlideInNotifications onclick={post} /> */}
                <ShimmerButtonDemo text={"post to community"} onClick={post}/>
            </motion.div>
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration:0.5,delay: 2.5 }}
        className='-mt-[5rem]'
      >
        <motion.h1 className='md:text-5xl md:leading-[5rem] sm:text-3xl text-4xl text-white text-center font-extrabold'>Wanna see Your past works<span className='text-orange'>?</span></motion.h1>
      </motion.div>

      <div className="flex justify-center items-center mt-5">
      <motion.button
          variants={{
            hover: {
              scale: 1.3,
              backgroundColor: "#000",  
              borderColor: "#FF7D29",      
              borderWidth: "2px",       
              transition: {
                duration: 0.5,
                ease: "backInOut",
              },
            },
          }}
          initial={{opacity: 0,y:-100}}
          animate={{opacity:1,y:0}}
          
          whileHover="hover"
          transition={{
            duration: 1,
            ease: "backInOut",
            delay:3,
            
          }}
          className="rounded-full lg:w-20 sm:w-14 lg:h-20 sm:h-14 items-center bg-white flex justify-center"
          style={{ border: "2px solid transparent" }} 
        >
          <motion.div
            variants={{
              hover: {
                rotate: 90,            
                color: "#fff",
                transition:{
                    duration: 0.5,
                    ease: "backInOut",
                  
                }         
              },
              
            }}
            initial={{ color: "#000" ,opacity:0,y:50}} 
            animate={{opacity:1,y:0}}
            transition={{
              duration: 0.5,
              ease: "backInOut",
              delay:3.5,
              
            }}
          >
           
            <Link to='/Regrets'><FaArrowRight size="25"/></Link>
          </motion.div>
        </motion.button>


      </div>
      <motion.div
      
      initial={{opacity:0,y:-100}}
      animate={{opacity:1,y:0}}
      transition={{duration:1,ease: "backInOut",delay:3.5}}
       className='text-xl flex gap-4 sm:text-[18px] justify-center font-semibold underline underline-offset-8 decoration-orange cursor-pointer mt-14'>
          <p>Follow us on</p>
         <FaGithub 
         
         color='white' size="25"/> 
         <FaInstagram 
         
         color='white' size="25"/>   
         <FaXTwitter
         
          color='white' size="25"/>
         <FaFacebook
         
          color='white' size="25"/>
         
      </motion.div>

    </motion.div>
    
    </> 
  );
}

export default transition(Home);
