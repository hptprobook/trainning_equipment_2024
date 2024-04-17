import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function CompilerHeader({ height, theme }) {
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
        <img src="/logo/logo.png" height={20} alt="" />
      </Link>
      <Link
        to={'/chat'}
        style={{
          color: theme === 'light' ? '#333' : '#fff',
        }}
      >
        <Button variant="outlined" endIcon={<ArrowRightAltIcon />}>
          FPT AI
        </Button>
      </Link>
    </Box>
  );
}
