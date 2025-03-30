import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import './chatbot.css';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input === "") return;

    const userMessage = { name: "User", message: input };
    setMessages([...messages, userMessage]);

    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const botMessage = { name: "Sam", message: data.answer };
        setMessages([...messages, userMessage, botMessage]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setInput("");
  };

  return (
    <div className="chatbox">
      <div className={`chatbox__support ${isOpen ? 'chatbox--active' : ''}`}>
        <div className="chatbox__header">
          <div className="chatbox__image--header">
            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="avatar" />
          </div>
          <div className="chatbox__content--header">
            <h4 className="chatbox__heading--header">Chat support</h4>
            <p className="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
          </div>
        </div>
        <div className="chatbox__messages">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </div>
        <div className="chatbox__footer">
          <input 
            type="text" 
            placeholder="Write a message..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onClick={(e) => { if (e.key === 'Enter') handleSend() }} 
          />
          <button className="chatbox__send--footer send__button" onClick={handleSend}>Send</button>
        </div>
      </div>
      <div className="chatbox__button">
        <button onClick={handleToggle}><img src="./images/chatbox-icon.svg" alt="Chat icon" /></button>
      </div>
    </div>
  );
}

export default Chatbox;
