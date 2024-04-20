import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Avatar, Box, Typography } from '@mui/material';
const AnswerLoading = React.forwardRef((props, ref) => {
  return (
    <Stack spacing={1} sx={{ marginTop: '36px' }} ref={ref}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt="BEE AI"
          src={'/logo/white.png'}
          sx={{ width: 24, height: 24 }}
        />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            marginLeft: 1,
          }}
        >
          FPT Chat
        </Typography>
      </Box>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    </Stack>
  );
});
export default AnswerLoading;