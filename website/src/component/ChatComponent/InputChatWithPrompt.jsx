import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './style.css';
import OptionSelect from '../Select/OptionSelect';
const languageOption = [
  {
    name: 'English',
    value: 'english'
  },
  {
    name: 'Viet Nam',
    value: 'vietnamese'
  },
  {
    name: 'Japanese',
    value: 'japanese'
  }
];
const styleWriting = [
  {
    name: 'Default',
    value: 'default'
  },
  {
    name: 'Academic',
    value: 'academic'
  },
  {
    name: 'Creative',
    value: 'creative'
  },
  {
    name: 'Critical',
    value: 'critical'
  }
];

const InputChatWithPrompt = ({ promt, handleGetContent, handleCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    handleGetContent(value);
  }

  return (
    <Box
      className='container-chat-with-prompt'
    >
      <form onSubmit={handleSubmit}>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" padding={2} gutterBottom>
          {promt.title}
        </Typography>
        <Typography variant="body2" padding={2}>
          {promt.content}
        </Typography>
        <div className='chat-input'>
          <input type="hidden" value={promt.content} name='promt' />
          <input placeholder='Type your content' type="text" name='input' className='input' />
          <IconButton aria-label="send" type='submit'>
            <ArrowUpwardIcon />
          </IconButton>
        </div>
        <Button sx={{ margin: 2 }} onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default InputChatWithPrompt;