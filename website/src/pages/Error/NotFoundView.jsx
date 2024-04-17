import { NavLink, useNavigate } from 'react-router-dom';
import './style.css';
import { Button } from '@mui/material';
import { useTheme } from '@emotion/react';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  const theme = useTheme();
const navigate = useNavigate();
  return (
    <div className='not-found-page'>
   <img src="./gif/404.gif" alt="" />
   <Button
        size="medium"
        variant="contained"
        sx={{
          width: 'fit-content',
          backgroundColor: theme.palette.background.fpt,
          '&:hover': {
            backgroundColor: theme.palette.background.fptHover,
          },
          position: 'absolute',
          bottom: '64px'
        }}
        onClick={() => navigate('/')}
      >
        Trang chủ
      </Button>
    </div>
  )
}
