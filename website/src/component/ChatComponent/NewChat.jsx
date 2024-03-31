import React, { useEffect, useState } from 'react';
import CardPrompt from '../Card/CardPrompt';
import { Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPrompts } from '~/redux/slices/promptsSlice';

const NewChat = ({ handleAddPrompt }) => {
  const dispatch = useDispatch();
  const [prompts, setPrompts] = useState([]);
  const data = useSelector((state) => state.prompts.data.prompts);
  const status = useSelector((state) => state.prompts.status);
  const error = useSelector((state) => state.prompts.error);
  useEffect(() => {
    dispatch(getAllPrompts());
  }, [dispatch]);
  useEffect(() => {
    if (status === 'success') {
      setPrompts(data);
    }
  }, [status, data]);
  const handlePrompt = (content) => {
    handleAddPrompt(content);
  };
  return (
    <div>
      <h1>New Chat</h1>
      <p>How can I help you today?</p>
      <Grid spacing={2} container>
        {prompts.map((item, index) => (
          <CardPrompt
            key={index}
            template={item.prompt_template}
            title={item.prompt_title}
            content={item.teaser}
            handleClick={handlePrompt}
          />
        )
        )}
      </Grid>
    </div>
  );
};

export default NewChat;