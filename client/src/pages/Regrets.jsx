// import React, { useState, useEffect, useContext } from "react";
// import { motion } from "framer-motion";
// import { ExpandableCardDemo } from "../components/ui/ExpendableCard";
// import { DragCards } from "../components/ui/DragCards";
// import transition from "../transition";
// import GradualSpacing from "../components/ui/gradual-spacing";
// import { ShimmerButton } from "../components/ui/ShimmerButton";
// import axios from "axios";
// import { Context } from "../context/Context";

// const ShimmerButtonDemo = ({ text, onclick }) => {
//   return (
//     <div className="z-10 flex items-center justify-center">
//       <ShimmerButton className="shadow-2xl" onClick={onclick}>
//         <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
//           {text}
//         </span>
//       </ShimmerButton>
//     </div>
//   );
// };

// const Regrets = () => {
//   const { messages, setMessages } = useContext(Context);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/journal"); // Adjust the URL to your API endpoint
//         const descriptions = response.data.map(post => post.description); // Extract descriptions
//         setMessages(descriptions); // Replace messages in state
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   // Clear all messages
//   const handleClearMessages = () => {
//     setMessages([]); // Clear the state by setting it to an empty array
//   };

//   return (
//     <div>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5, ease: "backInOut", delay: 1 }}
//       >
//         <DragCards />

//         <div className="flex items-center">
//           {messages.length > 0 ? (
//             messages.map((message, index) => (
//               <div key={index} className="relative">
//                 {/* Key should be on the outermost div */}
//                 <ExpandableCardDemo content={message} />
//               </div>
//             ))
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 1, ease: "easeOut", delay: 1 }}
//               className="flex flex-col h-[20rem] items-center justify-center w-full"
//             >
//               <GradualSpacing
//                 style={{ fontFamily: "Neue" }}
//                 className="font-display mt-2 text-center text-4xl font-bold -tracking-widest text-white dark:text-white md:text-5xl md:leading-[5rem] ls:text-3xl sm:text-[20px]"
//                 text="There is Nothing yet"
//               />
//             </motion.div>
//           )}
//         </div>

//         <div>
//           {messages.length > 0 && (
//             <ShimmerButtonDemo onclick={handleClearMessages} text={"Clear All"} />
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default transition(Regrets);


import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ExpandableCardDemo } from "../components/ui/ExpendableCard";
import { DragCards } from "../components/ui/DragCards";
import transition from "../transition";
import GradualSpacing from "../components/ui/gradual-spacing";
import { ShimmerButton } from "../components/ui/ShimmerButton";
import axios from "axios";
import { Context } from "../context/Context";

const ShimmerButtonDemo = ({ text, onclick }) => {
  return (
    <div className="z-10 flex items-center justify-center">
      <ShimmerButton className="shadow-2xl" onClick={onclick}>
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          {text}
        </span>
      </ShimmerButton>
    </div>
  );
};

const Regrets = () => {
  const { messages, setMessages } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/journal"); // Adjust the URL to your API endpoint
        const descriptions = response.data.map(post => ({ 
          id: post._id, // Assuming the journal entry has an `_id` field
          description: post.description 
        })); // Extract descriptions along with IDs
        setMessages(descriptions); // Replace messages in state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchMessages();
  }, []);

  // Clear all messages
  const handleClearMessages = () => {
    setMessages([]); // Clear the state by setting it to an empty array
  };

  // Delete a specific journal entry
  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/journal/${id}`); // Send delete request to the backend
      // Update the state to remove the deleted message
      setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
    } catch (error) {
      console.error("Error deleting journal entry:", error);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "backInOut", delay: 1 }}
      >
        <DragCards />

        <div className="grid lg:grid-cols-3 md:grid-cols-2">
          {messages.length > 0 ? (
            messages.map(({ id, description }, index) => (
              <div key={index} className="relative">
                <ExpandableCardDemo content={description} />
                <div className="">
                <ShimmerButtonDemo text="Delete" onclick={() => handleDeleteMessage(id)} />
                </div>
                {/* Add a delete button for each journal entry */}
              </div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
              className="flex flex-col h-[20rem] items-center justify-center w-full"
            >
              <GradualSpacing
                style={{ fontFamily: "Neue" }}
                className="font-display mt-2 text-center text-4xl font-bold -tracking-widest text-white dark:text-white md:text-5xl md:leading-[5rem] ls:text-3xl sm:text-[20px]"
                text="There is Nothing yet"
              />
            </motion.div>
          )}
        </div>

        <div>
          {messages.length > 0 && (
            <div className="mt-10">
              <ShimmerButtonDemo  onclick={handleClearMessages} text={"Clear All"} />

            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default transition(Regrets);
