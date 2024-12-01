import React from 'react';
import { motion } from "framer-motion";

// Adjusting the transition function to take a component as an argument
function transition(Component) {
  return (props) => ( // Return a functional component
    <>
      {/* The component is now rendered correctly */}
      <Component {...props} />
      <motion.div
        className='fixed top-0 left-0 w-full h-screen bg-white origin-bottom'
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }} // Animate to scaleY: 1
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className='fixed top-0 left-0 w-full h-screen bg-white origin-top'
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}

export default transition;
