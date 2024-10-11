import React, { useState } from 'react';

function ChatInput({ sendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Posez votre question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default ChatInput;