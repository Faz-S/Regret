
// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence, useAnimation } from 'framer-motion';
// import { Wand2, Mic } from 'lucide-react';
// import axios from 'axios';
// import { cn } from '../../lib/utils';
// const orangeColor = '#FF7D29';

// const Chat = () => {
//   const [sessionId, setSessionId] = useState("01");
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const [response, setResponse] = useState('');
//   const controls = useAnimation();
//   const [submitted, setSubmitted] = useState(false);
//   const [time, setTime] = useState(0);
//   const chatContainerRef = useRef(null);
//   const [isClient, setIsClient] = useState(false);
//   useEffect(() => {
//     setIsClient(true);
// }, []);

// useEffect(() => {
//     let intervalId;

//     if (submitted) {
//         intervalId = setInterval(() => {
//             setTime((t) => t + 1);
//         }, 1000);
//     } else {
//         setTime(0);
//     }

//     return () => clearInterval(intervalId);
// }, [submitted]);
//   // Initialize speech recognition
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//         .toString()
//         .padStart(2, "0")}`;
// };

//   const initSpeechRecognition = () => {
//     if (!recognition) {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognitionInstance = new SpeechRecognition();

//         recognitionInstance.continuous = false;
//         recognitionInstance.interimResults = false;
//         recognitionInstance.lang = 'en-US';

//         recognitionInstance.onresult = async (event) => {
//           const transcript = event.results[0][0].transcript;
//           handleSend(transcript);
//         };

//         recognitionInstance.onerror = (event) => {
//           console.error('Speech recognition error', event.error);
//         };

//         recognitionInstance.onstart = () => {
//           setIsMicActive(true);
//           controls.start({
//             scale: [1, 1.05, 1],
//             transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
//           });
//         };

//         recognitionInstance.onend = () => {
//           setIsMicActive(false);
//           controls.stop();
//         };

//         setRecognition(recognitionInstance);
//       } else {
//         console.error('Speech Recognition API not supported in this browser.');
//       }
//     }
//   };

//   useEffect(() => {
//     initSpeechRecognition();
//   }, []); // Initialize on component mount

//   // Start or stop recognition
//   const handleVoiceInput = () => {
//     if (recognition) {
//       if (isMicActive) {
//         recognition.stop();
//       } else {
//         recognition.start();
//       }
//     }
//   };

//   const handleSend = async (input) => {
//     if (input.trim()) {
//       setMessages((prev) => [...prev, { id: Date.now(), text: input, sender: 'user' }]);
//       setIsTyping(true);
//       try {
//         const response = await axios.post('http://localhost:5000/chat', {
//           session_id: sessionId,
//           question: input,
//         });
//         setMessages((prev) => [
//           ...prev,
//           { id: Date.now(), text: response.data.response, sender: 'bot' },
//         ]);
//       } catch (error) {
//         console.error('Error fetching bot response:', error);
//         setMessages((prev) => [
//           ...prev,
//           { id: Date.now(), text: 'Sorry, there was an error processing your request.', sender: 'bot' },
//         ]);
//       } finally {
//         setIsTyping(false);
//       }
//     }
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const messageVariants = {
//     initial: { opacity: 0, y: 50, rotate: -10, scale: 0.5 },
//     animate: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 100 } },
//     exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
//   };

//   return (<>
    
//     <div className="flex flex-col h-screen bg-black text-white">
//       <motion.div
//         className="flex-1 overflow-hidden p-4 relative"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         >
        
//         <div ref={chatContainerRef} className="h-full overflow-y-auto space-y-4 relative z-10">
//           <AnimatePresence>
//             {messages.map((message) => (
//               <motion.div
//               key={message.id}
//               variants={messageVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.05, rotate: 5 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`max-w-xs p-3 rounded-lg ${
//                     message.sender === 'user' ? `bg-[${orangeColor}] text-black` : 'bg-gray-800 text-white'
//                   }`}
//                   style={{ boxShadow: `0 0 15px ${orangeColor}55` }}
//                   >
//                   {message.text}
//                 </motion.div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//           {isTyping && (
//             <motion.div
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.5 }}
//             transition={{ duration: 0.5 }}
//             className="flex justify-start"
//             >
//               <motion.div
//                 animate={{
//                   rotate: [0, 360],
//                   borderRadius: [
//                     '50% 50% 50% 50%',
//                     '50% 50% 20% 80%',
//                     '50% 20% 50% 80%',
//                     '20% 50% 80% 50%',
//                     '50% 50% 50% 50%',
//                   ],
//                 }}
//                 transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
//                 className="bg-gray-800 p-3 rounded-lg"
//                 style={{ boxShadow: `0 0 15px ${orangeColor}55` }}
//                 >
//                 <Wand2 className="h-6 w-6 text-[#FF7D29]" />
//               </motion.div>
//             </motion.div>
//           )}
          
//         </div>
        
//       </motion.div>
//       <motion.div
//           className="absolute inset-0 pointer-events-none"
//           animate={controls}
//           style={{
//             background: `radial-gradient(circle, ${orangeColor}22 0%, transparent 70%)`,
//             mixBlendMode: 'screen',
//           }}
//         />
//       <motion.div
//         className="p-4 bg-blend-normal"
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ type: 'spring', stiffness: 100 }}
//         >
//         <div className="w-full py-5 justify-center bg-none">
//                         <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
//                             <button
//                                 className={cn(
//                                     "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
//                                     isMicActive
//                                         ? "bg-orange-500"
//                                         : "bg-none hover:bg-orange/10 dark:hover:bg-white/10"
//                                 )}
//                                 type="button"
//                                 onClick={handleVoiceInput}
//                             >
//                                 {isMicActive ? (
//                                     <div
//                                         className="w-6 h-6 rounded-sm animate-spin bg-white dark:bg-white cursor-pointer pointer-events-auto"
//                                         style={{ animationDuration: "3s" }}
//                                     />
//                                 ) : (
//                                     <Mic className="w-7 h-7 text-orange dark:text-white/70" />
//                                 )}
//                             </button>

//                             <span
//                                 className={cn(
//                                     "font-mono text-[16px] transition-opacity duration-300",
//                                     isMicActive
//                                         ? "text-orange/70 dark:text-white/70"
//                                         : "text-white/100 dark:text-white/30"
//                                 )}
//                             >
//                                 {formatTime(time)}
//                             </span>

//                             <div className="h-4 w-64 flex items-center justify-center gap-0.5">
//                                 {[...Array(48)].map((_, i) => (
//                                     <div
//                                         key={i}
//                                         className={cn(
//                                             "w-0.5 rounded-full transition-all duration-300",
//                                             isMicActive
//                                                 ? "bg-white/100 dark:bg-white/50 animate-pulse"
//                                                 : "bg-white/100 dark:bg-white/10 h-1"
//                                         )}
//                                         style={
//                                             isMicActive && isClient
//                                                 ? {
//                                                       height: `${20 + Math.random() * 80}%`,
//                                                       animationDelay: `${i * 0.05}s`,
//                                                   }
//                                                 : undefined
//                                         }
//                                     />
//                                 ))}
//                             </div>

                            
//                         </div>
//                 </div>
                
//       </motion.div>
//     </div>
//         </>
//   );
// };

// export default Chat;
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Wand2, Mic } from 'lucide-react';
import axios from 'axios';
import { cn } from '../../lib/utils';

const orangeColor = '#FF7D29';

const Chat = () => {
  const [sessionId, setSessionId] = useState("01");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isMicActive, setIsMicActive] = useState(false);
  const [response, setResponse] = useState('');
  const controls = useAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const chatContainerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let intervalId;

    if (submitted) {
        intervalId = setInterval(() => {
            setTime((t) => t + 1);
        }, 1000);
    } else {
        setTime(0);
    }

    return () => clearInterval(intervalId);
  }, [submitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
  };

  const initSpeechRecognition = () => {
    if (!recognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();

        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = async (event) => {
          const transcript = event.results[0][0].transcript;
          handleSend(transcript);
        };

        recognitionInstance.onerror = (event) => {
          console.error('Speech recognition error', event.error);
        };

        recognitionInstance.onstart = () => {
          setIsMicActive(true);
          controls.start({
            scale: [1, 1.05, 1],
            transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          });
        };

        recognitionInstance.onend = () => {
          setIsMicActive(false);
          controls.stop();
        };

        setRecognition(recognitionInstance);
      } else {
        console.error('Speech Recognition API not supported in this browser.');
      }
    }
  };

  useEffect(() => {
    initSpeechRecognition();
  }, []); // Initialize on component mount

  const handleVoiceInput = () => {
    if (recognition) {
      if (isMicActive) {
        recognition.stop();
      } else {
        recognition.start();
      }
    }
  };

  const handleSend = async (input) => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { id: Date.now(), text: input, sender: 'user' }]);
      setIsTyping(true);

      try {
        const response = await axios.post('http://localhost:5000/chat', {
          session_id: sessionId,
          question: input,
        });

        const botResponse = response.data.response;
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), text: '', sender: 'bot' },
        ]);
        typeResponse(botResponse);
      } catch (error) {
        console.error('Error fetching bot response:', error);
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), text: 'Sorry, there was an error processing your request.', sender: 'bot' },
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  // Simulate typing effect for bot response
  const typeResponse = (text) => {
    let index = 0;
    const interval = setInterval(() => {
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = {
          ...updatedMessages[updatedMessages.length - 1],
          text: text.substring(0, index + 1),
        };
        return updatedMessages;
      });
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, 50); // Adjust the typing speed by modifying the interval time (50ms)
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const messageVariants = {
    initial: { opacity: 0, y: 50, rotate: -10, scale: 0.5 },
    animate: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 100 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-black text-white">
        <motion.div
          className="flex-1 overflow-hidden p-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div ref={chatContainerRef} className="h-full overflow-y-auto space-y-4 relative z-10">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  variants={messageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === 'user' ? `bg-[${orangeColor}] text-black` : 'bg-gray-800 text-white'
                    }`}
                    style={{ boxShadow: `0 0 15px ${orangeColor}55` }}
                  >
                    {message.text}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                className="flex justify-start"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    borderRadius: [
                      '50% 50% 50% 50%',
                      '50% 50% 20% 80%',
                      '50% 20% 50% 80%',
                      '20% 50% 80% 50%',
                      '50% 50% 50% 50%',
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="bg-gray-800 p-3 rounded-lg"
                  style={{ boxShadow: `0 0 15px ${orangeColor}55` }}
                >
                  <Wand2 className="h-6 w-6 text-[#FF7D29]" />
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={controls}
          style={{
            background: `radial-gradient(circle, ${orangeColor}22 0%, transparent 70%)`,
            mixBlendMode: 'screen',
          }}
        />
        <motion.div
          className="bg-blend-normal"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="w-full py-5 justify-center bg-none">
            <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
              <button
                className={cn(
                  "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
                  isMicActive ? "bg-orange-500" : "bg-none hover:bg-orange/10 dark:hover:bg-white/10"
                )}
                type="button"
                onClick={handleVoiceInput}
              >
                {isMicActive ? (
                  <div
                    className="w-6 h-6 rounded-sm animate-spin bg-white"
                  />
                ) : (
                  <Mic className="text-white" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Chat;
