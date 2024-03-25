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
  const [dissable, setDissable] = React.useState(true);
  const handleValue = (value) => {
    console.log(value);
  };
  const handleInput = (e) => {
    if (e.target.value === '') {
      setDissable(true);
    }
    else {
      setDissable(false);
    }
  }
  const handleForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    console.log(value);
  }
  return (
    <Box
      className='container-chat-input'
    >
      <form onSubmit={handleForm}>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            padding: '12px',
          }}
        >
          <OptionSelect label={'Language'} option={languageOption} handle={handleValue} name={'language'} />
          <OptionSelect label={'Style Writing'} option={styleWriting} handle={handleValue} name={'style'} />
        </Stack>
        <div className='chat-input'>
          <input onChange={handleInput} name='input' placeholder='Type your question' type="text" className='input' />
          <IconButton aria-label="send" disabled={dissable} type='submit'>
            <ArrowUpwardIcon />
          </IconButton>
        </div>
      </form>
    </Box>
  );
};

export default InputChat;