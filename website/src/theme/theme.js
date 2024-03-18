import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { palette } from './palette.js';
import { customShadows } from './custom-shadows.js';
const theme = extendTheme({
  palette,
  customShadows
});

export default theme;
