import React, { useRef, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Chip } from '@mui/material';
import { format, isValid } from 'date-fns';

function ChatWindow({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const renderMessageContent = (msg) => {
    debugger
    if (msg.type === 'text') {
      return <Typography variant="body1">{msg.content}</Typography>;
    } else if (msg.type === 'file') {
      return (
        <Box>
          <Typography variant="body2">Fichier partagé:</Typography>
          <Chip
            label={msg.fileName}
            onClick={() => window.open(msg.fileUrl, '_blank')}
            sx={{ cursor: 'pointer', marginTop: 1 }}
          />
        </Box>
      );
    }
    return null;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    if (isValid(date)) {
      return format(date, 'HH:mm');
    }
    return '';
  };

  return (
    <Box sx={{ height: '70vh', overflowY: 'auto', padding: 2, backgroundColor: '#f5f5f5' }}>
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: 2,
          }}
        >
          {msg.sender !== 'user' && (
            <Avatar sx={{ marginRight: 1, bgcolor: 'primary.main' }}>AI</Avatar>
          )}
          <Paper
            elevation={1}
            sx={{
              maxWidth: '70%',
              padding: 2,
              backgroundColor: msg.sender === 'user' ? '#e3f2fd' : '#ffffff',
              borderRadius: '20px',
              borderTopRightRadius: msg.sender === 'user' ? 0 : '20px',
              borderTopLeftRadius: msg.sender === 'user' ? '20px' : 0,
            }}
          >
            {renderMessageContent(msg)}
            <Typography variant="caption" sx={{ display: 'block', marginTop: 1, color: 'text.secondary' }}>
              {formatTimestamp(msg.timestamp)}
            </Typography>
          </Paper>
          {msg.sender === 'user' && (
            <Avatar sx={{ marginLeft: 1, bgcolor: 'secondary.main' }}>U</Avatar>
          )}
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
}

export default ChatWindow;