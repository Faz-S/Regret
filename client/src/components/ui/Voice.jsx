
"use client";

import { Mic } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
const orangeColor = "#FF7D29";

export default function AIInput_08() {
    const [sessionId, setSessionId] = useState("user_session_1");
    const [recognition, setRecognition] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [time, setTime] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [content, setContent] = useState("");
    const [isMicActive, setIsMicActive] = useState(false); 
    const [response,setResponse] =useState("")// Track mic active state
    const controls = useAnimation();

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
                recognitionInstance.lang = "en-US";

                recognitionInstance.onresult = async (event) => {
                    const transcript = event.results[0][0].transcript;
                    setContent(transcript);
                    const response = await axios.post("http://127.0.0.1:5000/chat", {
                        session_id: sessionId,
                        question: transcript,
                      });
                    setResponse(response.data.response)
                };

                recognitionInstance.onerror = (event) => {
                    console.error("Speech recognition error", event.error);
                };

                recognitionInstance.onstart = () => {
                    setIsMicActive(true);
                    controls.start({
                        scale: [1, 1.05, 1],
                        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    });
                };

                recognitionInstance.onend = () => {
                    setIsMicActive(false);
                    controls.stop();
                };

                setRecognition(recognitionInstance);
            } else {
                console.error("Speech Recognition API not supported in this browser.");
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

    return (
        <>
            <div className="">
                <motion.div
                    className="flex-1 overflow-hidden p-4 relative flex items-end h-screen justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={controls}
                        style={{
                            background: `radial-gradient(circle, ${orangeColor}22 0%, transparent 70%)`,
                            mixBlendMode: "screen",
                        }}
                    />
                    <div className="absolute top-4 right-4 bg-orange-200 text-black px-4 py-2 rounded-md shadow-md">
                        <p className="text-sm font-semibold text-white">{content || "Speak now..."}</p>
                        {response && (
                            <p>
                                {response}
                            </p>
                        )}
                    </div>
                    <div className="w-full py-5 justify-center bg-none">
                        <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
                            <button
                                className={cn(
                                    "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
                                    isMicActive
                                        ? "bg-orange-500"
                                        : "bg-none hover:bg-orange/10 dark:hover:bg-white/10"
                                )}
                                type="button"
                                onClick={handleVoiceInput}
                            >
                                {isMicActive ? (
                                    <div
                                        className="w-6 h-6 rounded-sm animate-spin bg-white dark:bg-white cursor-pointer pointer-events-auto"
                                        style={{ animationDuration: "3s" }}
                                    />
                                ) : (
                                    <Mic className="w-7 h-7 text-orange dark:text-white/70" />
                                )}
                            </button>

                            <span
                                className={cn(
                                    "font-mono text-[16px] transition-opacity duration-300",
                                    isMicActive
                                        ? "text-orange/70 dark:text-white/70"
                                        : "text-white/100 dark:text-white/30"
                                )}
                            >
                                {formatTime(time)}
                            </span>

                            <div className="h-4 w-64 flex items-center justify-center gap-0.5">
                                {[...Array(48)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "w-0.5 rounded-full transition-all duration-300",
                                            isMicActive
                                                ? "bg-white/100 dark:bg-white/50 animate-pulse"
                                                : "bg-white/100 dark:bg-white/10 h-1"
                                        )}
                                        style={
                                            isMicActive && isClient
                                                ? {
                                                      height: `${20 + Math.random() * 80}%`,
                                                      animationDelay: `${i * 0.05}s`,
                                                  }
                                                : undefined
                                        }
                                    />
                                ))}
                            </div>

                            <p className="h-4 text-[16px] text-orange dark:text-white/70">
                                {isMicActive ? "Listening..." : "Click to speak"}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
