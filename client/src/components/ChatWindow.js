import React from 'react';

function ChatWindow({ messages }) {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
          <p><strong>{msg.sender === 'user' ? 'Vous' : 'Assistant'}</strong>: {msg.text}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;