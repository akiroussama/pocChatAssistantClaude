import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function ChatWindow({ messages }) {
  return (
    <Box sx={{ maxHeight: '400px', overflowY: 'auto', padding: 2 }}>
      {messages.map((msg, index) => (
        <Paper
          key={index}
          sx={{
            marginBottom: 1,
            padding: 1,
            backgroundColor: msg.sender === 'user' ? '#e3f2fd' : '#f1f8e9',
            textAlign: msg.sender === 'user' ? 'right' : 'left',
          }}
        >
          <Typography variant="body1">
            <strong>{msg.sender === 'user' ? 'Vous' : 'Assistant'}</strong>: {msg.text}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default ChatWindow;