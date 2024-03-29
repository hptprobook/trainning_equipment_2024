import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

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
        <Typography variant="body1" color={theme === 'light' ? 'inherit' : '#fff'}>
          SLIF Online Compiler
        </Typography>
      </Link>
      <Link
        to={'/chat'}
        style={{
          color: theme === 'light' ? '#333' : '#fff',
        }}
      >
        Chat Box{' '}
      </Link>
    </Box>
  );
}
