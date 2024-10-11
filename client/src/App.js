import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    // Ajouter le message de l'utilisateur à l'état local
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: message }]);
    
    // Envoyer la question au back-end
    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message });
      const botMessage = response.data.response;

      // Ajouter la réponse du bot à l'état local
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botMessage }]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ChatWindow messages={messages} />
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

export default App;