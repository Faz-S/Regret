// import React, { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { twMerge } from "tailwind-merge";
// import { ExpandableCardDemo } from "./ExpendableCard";
// export const DragCards = () => {
//   return (
//     <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-neutral-950">
//       <h2 className="relative z-0 text-[20vw] font-black text-neutral-800 md:text-[200px]">
//         Journal<span className="text-indigo-500">.</span>
//       </h2>
//       <Cards />
//     </section>
//   );
// };

// const Cards = () => {
//   const containerRef = useRef(null);

//   return (
//     <div className="absolute inset-0 z-10" ref={containerRef}>
      
//       <Card
//         containerRef={containerRef}
//         src="https://images.unsplash.com/photo-1635373670332-43ea883bb081?q=80&w=2781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Example image"
//         rotate="6deg"
//         top="20%"
//         left="25%"
//         className="w-36 md:w-56"
//       >
//         <ExpandableCardDemo />
//       </Card>
//       {/* <Card
//         containerRef={containerRef}
//         src="https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Example image"
//         rotate="12deg"
//         top="45%"
//         left="60%"
//         className="w-24 md:w-48"
//       />
//       <Card
//         containerRef={containerRef}
//         src="https://images.unsplash.com/photo-1503751071777-d2918b21bbd9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Example image"
//         rotate="-6deg"
//         top="20%"
//         left="40%"
//         className="w-52 md:w-80"
//       />
//       <Card
//         containerRef={containerRef}
//         src="https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=2609&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Example image"
//         rotate="8deg"
//         top="50%"
//         left="40%"
//         className="w-48 md:w-72"
//       />
//       <Card
//         containerRef={containerRef}
//         src="https://images.unsplash.com/photo-1602212096437-d0af1ce0553e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Example image"
//         rotate="18deg"
//         top="20%"
//         left="65%"
//         className="w-40 md:w-64"
//       />
//       <Card
//         containerRef={containerRef}
//         src="https://images.unsplash.com/photo-1622313762347-3c09fe5f2719?q=80&w=2640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Example image"
//         rotate="-3deg"
//         top="35%"
//         left="55%"
//         className="w-24 md:w-48"
//       /> */}
//     </div>
//   );
// };

// const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
//   const [zIndex, setZIndex] = useState(0);

//   const updateZIndex = () => {
//     const els = document.querySelectorAll(".drag-elements");

//     let maxZIndex = -Infinity;

//     els.forEach((el) => {
//       let zIndex = parseInt(
//         window.getComputedStyle(el).getPropertyValue("z-index")
//       );

//       if (!isNaN(zIndex) && zIndex > maxZIndex) {
//         maxZIndex = zIndex;
//       }
//     });

//     setZIndex(maxZIndex + 1);
//   };

//   return (
//     <motion.img
//       onMouseDown={updateZIndex}
//       style={{
//         top,
//         left,
//         rotate,
//         zIndex,
//       }}
//       className={twMerge(
//         "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4",
//         className
//       )}
//       src={src}
//       alt={alt}
//       drag
//       dragConstraints={containerRef}
//       // Uncomment below and remove dragElastic to remove movement after release
//       //   dragMomentum={false}
//       dragElastic={0.65}
//     />
//   );
// };
// import React, { Component, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { twMerge } from "tailwind-merge";

// export const DragCards = ({Component}) => {
//   return (
//     <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-neutral-950">
//       <h2 className="relative z-0 text-[20vw] font-black text-neutral-800 md:text-[200px]">
//         Journal<span className="text-indigo-500">.</span>
//       </h2>
//       <Cards Component={Component}/>
//     </section>
//   );
// };

// const Cards = ({Component}) => {
//   const containerRef = useRef(null);

//   return (
//     <div className="absolute inset-0 z-10 " ref={containerRef}>
//       <Card
//         containerRef={containerRef}
//         Component={Component}
//         rotate="6deg"
//         top="20%"
//         left="25%"
//         className="w-36 md:w-56 text-white border-white"
//       />
//       {/* <Card
//         containerRef={containerRef}
//         content="Second draggable box with some more text."
//         rotate="12deg"
//         top="45%"
//         left="60%"
//         className="w-24 md:w-48 bg-white"
//       />
//       <Card
//         containerRef={containerRef}
//         content="Another draggable box with more content."
//         rotate="-6deg"
//         top="20%"
//         left="40%"
//         className="w-52 md:w-80 bg-white"
//       />
//       <Card
//         containerRef={containerRef}
//         content="Fourth box with some dummy data."
//         rotate="8deg"
//         top="50%"
//         left="40%"
//         className="w-48 md:w-72 bg-white"
//       />
//       <Card
//         containerRef={containerRef}
//         content="Last box to drag around."
//         rotate="18deg"
//         top="20%"
//         left="65%"
//         className="w-40 md:w-64 bg-white"
//       /> */}
//     </div>
//   );
// };

// const Card = ({ containerRef, content, top, left, rotate, className,Component }) => {
//   const [zIndex, setZIndex] = useState(0);

//   const updateZIndex = () => {
//     const els = document.querySelectorAll(".drag-elements");

//     let maxZIndex = -Infinity;

//     els.forEach((el) => {
//       let zIndex = parseInt(
//         window.getComputedStyle(el).getPropertyValue("z-index")
//       );

//       if (!isNaN(zIndex) && zIndex > maxZIndex) {
//         maxZIndex = zIndex;
//       }
//     });

//     setZIndex(maxZIndex + 1);
//   };

//   return (
//     <motion.div
//       onMouseDown={updateZIndex}
//       style={{
//         top,
//         left,
//         rotate,
//         zIndex,
//       }}
//       className={twMerge(
//         "drag-elements absolute border bg-neutral-200 p-4 text-black shadow-lg rounded-lg",
//         className
//       )}
//       drag
//       dragConstraints={containerRef}
//       dragElastic={0.65}
//     >
//       <Component />
//     </motion.div>
//   );
// };
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { ExpandableCardDemo } from "./ExpendableCard";
// Main DragCards component
export const DragCards = () => {
  return (
    <section className="relative grid w-full place-content-center overflow-hidden bg-neutral-950">
      <h2 className="relative z-0 text-[20vw] font-black text-neutral-800 lg:text-[200px] ls:text-[100px] sm:text-[70px] lg:-mt-[4rem]">
        Journal<span className="text-orange">.</span>
      </h2>
      
    </section>
  );
};

// Cards component to hold individual draggable cards
const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-10 " ref={containerRef}>
      <Card
        containerRef={containerRef}
        rotate="6deg"
        top="20%"
        left="25%"
        className="w-36 md:w-56 text-white border-white"
      />
      {/* You can add more draggable components here */}
    </div>
  );
};

// Draggable Card component
const Card = ({ containerRef, Component, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.div
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute border bg-neutral-200 p-4 text-black shadow-lg rounded-lg",
        className
      )}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
    >
      <ExpandableCardDemo/> {/* Render the passed component here */}
    </motion.div>
  );
};
