import { Box, IconButton, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './style.css';
import OptionSelect from '../Select/OptionSelect';
import { useSelector } from 'react-redux';
import { languageOption, modeOption, styleWriting } from '~/config/optionConfig';


const InputChat = ({ handleGetContent }) => {
  const status = useSelector((state) => state.chat.status);
  const [dissable, setDissable] = React.useState(true);
  const handleInput = (e) => {
    if (e.target.value === '') {
      setDissable(true);
    }
    else {
      setDissable(false);
    }
  };
  const handleForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    if (value.language !== '') {
      value.input = value.input + ' ' + ` with language output: ${value.language}`;
    }
    if (value.style !== '') {
      value.input = value.input + ' ' + ` and style writing: ${value.style}`;
    }
    e.target.reset();
    handleGetContent(value);
  };
  useEffect(() => {
    if (status === 'loading') {
      setDissable(true);
    }
  }, [status]);
  return (
    <Box
      className='container-chat-input'
    >
      <form onSubmit={handleForm}>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            padding: '12px 0',
          }}
        >
          <OptionSelect label={'Ngôn ngữ'} option={languageOption} name={'language'} noneValue={false} dfValue='vietnamese'/>
          <OptionSelect label={'Phong cách viết'} option={styleWriting} name={'style'}  noneValue={false}/>
          <OptionSelect noneValue={false} label={'Phiên bản'} option={modeOption} name={'model'} dfValue={'gemini'}/>

        </Stack>
        <div className='chat-input'>
          <TextField
            id="input-chat"
            multiline
            name='input'
            onChange={handleInput}
            maxRows={3}
            fullWidth
            placeholder="Input"
            sx={{
              '& .MuiInputBase-root': {
                padding: 0,
              },
              '& .MuiInputBase-input': {
                padding: '12px 0',
              },
              '& .MuiInputBase-root fieldset': {
                border: 'none',
              }
            }}
          />
          <div className='btn-submit'>
            <IconButton aria-label="send" disabled={dissable} type='submit'>
              <ArrowUpwardIcon />
            </IconButton>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default InputChat;