import React, { useState } from 'react';
import boxImage from "../../Assets/chatbot/chatbox.svg";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const newMessage = { text: input, sender: "user" };
      setMessages([...messages, newMessage]);
      setInput('');

      // Send message to the backend
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages([...messages, newMessage, { text: data.response, sender: "bot" }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Video Language Translator Chatbot</h1>
        </div>
        <div className="h-96 overflow-y-auto border p-2 mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 p-2 rounded-lg ${message.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-200"}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border rounded-l-lg"
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
        </div>
      </div>
    </div>
  );
}
export default Chatbot;
