import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div className={`messages__item ${message.name === 'Sam' ? 'messages__item--visitor' : 'messages__item--operator'}`}>
      {message.message}
    </div>
  );
}

export default ChatMessage;
