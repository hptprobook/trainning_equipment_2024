import { Avatar, Box } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useResponsive } from '~/config/reponsiveConfig';

const CardAnswer = ({ name, avatar, answer }) => {
  const mdReponsive = useResponsive('down', 'sm');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src={avatar}
        sx={{ width: 24, height: 24 }}
      />
      <Box
        sx={{
          letterSpacing: 0.5,
          width: mdReponsive ? '100%' : 'calc(800px - 32px)',

        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          {name}
        </Typography>
        {/* <Box
          sx={{
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            fontSize: 14,
            letterSpacing: 0.5,
            width: mdReponsive ? '100%' : 'calc(800px - 32px)',
          }}
        >
          {answer}
        </Box> */}
        <div
        style={{
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            fontSize: 14,
            letterSpacing: 0.5,
            width: mdReponsive ? 'calc(100% - 32px)' : 'calc(800px - 32px)',
        }}
        >
            {answer}
        </div>
      </Box>
    </div>
  );
};
CardAnswer.protoType = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  answer: PropTypes.string,
};
export default CardAnswer;