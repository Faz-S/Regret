import React, { useContext, useEffect, useState } from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { ShimmerButton } from "./ShimmerButton";
import { Context } from "../../context/Context";
export function ShimmerButtonDemo({ text }) {
    return (
      <div className="z-10 flex items-center justify-center">
        <ShimmerButton className="shadow-2xl ">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            {text}
          </span>
        </ShimmerButton>
      </div>
    );
  }
const SlideInNotifications = ({onclick}) => {
  const {input,setInput,message,setMessage,notifications,setNotifications}= useContext(Context)
  
  
  const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  return (
    <div className="bg-black flex items-center justify-center">
      <button
        onClick={onclick}
        className="text-sm text-white bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all font-medium px-3 py-2 rounded"
      
      >
        <ShimmerButtonDemo text={"Save"}/>
      </button>
      <div className="flex flex-col gap-1 w-72 md:-mt-[15rem] sm:-mt-[13rem] fixed top-2 right-2 z-50 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const NOTIFICATION_TTL = 5000;

const Notification = ({ text, id, removeNotif }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, []);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-indigo-500 pointer-events-auto"
    >
      <FiCheckSquare className=" mt-0.5" />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

export default SlideInNotifications;

export const generateRandomNotif = () => {
  const names = [
    "John Anderson",
    "Emily Peterson",
    "Frank Daniels",
    "Laura Williams",
    "Donald Sanders",
    "Tom Smith",
    "Alexandra Black",
  ];

  const randomIndex = Math.floor(Math.random() * names.length);

  const data = {
    id: Math.random(),
    text: `Saved To your Journal`,
  };

  return data;
};
export const generateCommunityNotification = () => {
  const names = [
    "John Anderson",
    "Emily Peterson",
    "Frank Daniels",
    "Laura Williams",
    "Donald Sanders",
    "Tom Smith",
    "Alexandra Black",
  ];

  const randomIndex = Math.floor(Math.random() * names.length);

  const data = {
    id: Math.random(),
    text: `Posted to the Community`,
  };

  return data;
};