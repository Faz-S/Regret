import React, {createContext,useState} from 'react'
export const Context = createContext();

const ContextProvider= (props) =>{

    const [input,setInput] = useState("");
    const [messages,setMessages]= useState([]);
    const [notifications, setNotifications] = useState([]);
    const contextValue = {
        input,
        setInput,
        messages,
        setMessages,
        notifications, 
        setNotifications
    }
  return (
    <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;

