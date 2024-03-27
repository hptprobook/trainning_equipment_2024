import { Grid, Stack } from '@mui/material';
import React from 'react';
import CardAnswer from '../Card/CardAnswer';
import AnswerLoading from '../Loading/AnswerLoading';

const LoadingNewChat = ({ name, answer, avatar }) => {
  return (
    <Stack
      spacing={1}
      sx={{
        marginTop: 2,
      }}
    >
      <CardAnswer
        name={name}
        avatar={avatar}
        answer={answer}
      />
      <AnswerLoading />

    </Stack>
  );
};

export default LoadingNewChat;