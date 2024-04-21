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
      Ứng dụng không được hỗ trợ trên máy tính bảng và thiết bị di động! <Link to={'/chat'}>BEE AI</Link>
    </Box>
  );
}
