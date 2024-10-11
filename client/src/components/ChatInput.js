import React, { useState, useRef, useEffect } from 'react';
import { TextField, IconButton, Box, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function ChatInput({ sendMessage, sendFile }) {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const textFieldRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    };
    textFieldRef.current.addEventListener('keydown', handleKeyDown);
    return () => textFieldRef.current.removeEventListener('keydown', handleKeyDown);
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (typeof sendFile === 'function') {
        sendFile(file);
      } else {
        console.warn('sendFile function is not provided. File upload is disabled.');
        // Optionally, you can show a user-friendly message here
      }
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
    textFieldRef.current.focus();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', padding: 2, position: 'relative' }}>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        variant="outlined"
        placeholder="Posez votre question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        inputRef={textFieldRef}
        sx={{ marginRight: 1 }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {typeof sendFile === 'function' && (
          <>
            <Tooltip title="Joindre un fichier">
              <IconButton onClick={() => fileInputRef.current.click()} color="primary">
                <AttachFileIcon />
              </IconButton>
            </Tooltip>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </>
        )}
        <Tooltip title="Insérer un emoji">
          <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)} color="primary">
            <EmojiEmotionsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Envoyer">
          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {showEmojiPicker && (
        <Box sx={{ position: 'absolute', bottom: '100%', right: 0, zIndex: 1 }}>
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </Box>
      )}
    </Box>
  );
}

export default ChatInput;