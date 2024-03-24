import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export default function ResponsiveBox() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: {
          xs: 'block',
          md: 'block',
          lg: 'none',
        },
      }}
    >
      The application is not supported on tablets and mobile devices! <Link to={'/chat'}>Chat Box</Link>
    </Box>
  );
}
