import { Avatar, Box } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useResponsive } from '~/config/reponsiveConfig';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
const CardAnswer = ({ name, avatar, answer }) => {
  const mdReponsive = useResponsive('down', 'sm');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: mdReponsive ? 'calc(100% - 32px)' : 'calc(800px - 16px)',
        marginTop: '36px',

      }}
    >
      <Avatar
        alt={name}
        src={avatar}
        sx={{ width: 24, height: 24 }}
      />
      <Box
        sx={{
          width: mdReponsive ? 'calc(100% - 32px)' : 'calc(800px - 48px)',
          marginLeft: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          {name}
        </Typography>
        <div
          style={{
            width: '100%',
            overflowY: 'hidden',
            overflowX: 'auto',
            '&::WebkitScrollbarTrackPiece:end': {
              width: 0,
              display: 'none'
            }
          }}
        >
          <Markdown remarkPlugins={[remarkGfm]}>{answer}</Markdown>
          {/* {answer} */}
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