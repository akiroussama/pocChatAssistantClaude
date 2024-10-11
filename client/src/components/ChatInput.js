import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

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
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Posez votre question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ marginRight: 1 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Envoyer
      </Button>
    </Box>
  );
}

export default ChatInput;