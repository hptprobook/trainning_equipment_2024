import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import useAuth from '~/customHooks/useAuth';

export default function CompilerHeader({ height, theme }) {
  const isAuth = useAuth();
  return (
    <Box
      sx={{
        width: '100%',
        height: height,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 4,
        bgcolor: theme === 'light' ? '#eeeeee' : '#424242',
      }}
    >
      <Link to={'/'}>
        <img src="/logo/fpt.png" height={40} alt="" />
      </Link>
      <Link
        to={isAuth ? '/chat' : '/login'}
        style={{
          color: theme === 'light' ? '#333' : '#fff',
        }}
      >
        <Button variant="outlined" endIcon={<ArrowRightAltIcon />}>
          {isAuth ? ' Bee Chat' : 'Login'}
        </Button>
      </Link>
    </Box>
  );
}
