import { Box, IconButton, Stack } from '@mui/material';
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

const InputChat = () => {
  const handleValue = (value) => {
    console.log(value);
  };

  return (
    <Box
      className='container-chat-input'
    >
      <Stack
        spacing={2}
        direction="row"
        sx={{
          padding: '12px',
        }}
      >
        <OptionSelect label={'Language'} option={languageOption} handle={handleValue} />
        <OptionSelect label={'Style Writing'} option={styleWriting} handle={handleValue} />
      </Stack>
      <div className='chat-input'>
        <input placeholder='Type your question' type="text" className='input' />
        <IconButton aria-label="send">
          <ArrowUpwardIcon />
        </IconButton>
      </div>
    </Box>
  );
};

export default InputChat;