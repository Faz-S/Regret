import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [sessionId, setSessionId] = useState("01");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { role: "user", content: input }]);
        const response = await axios.post("http://localhost:5000/chat", {
            session_id: sessionId,
            question: input
        });

        setMessages([
            ...messages,
            { role: "user", content: input },
            { role: "bot", content: response.data.response }
        ]);
        setInput("");
    };

    return (
        <div className="App">
            <h1>Chat with the AI Assistant</h1>
            <div className="chat-window">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.role}`}>
                        <strong>{msg.role === "user" ? "You" : "Bot"}: </strong>
                        {msg.content}
                    </div>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default App;