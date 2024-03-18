import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { palette } from './palette.js';
import { customShadows } from './custom-shadows.js';
import { overrides } from './overrides';
const theme = extendTheme({
  palette,
  customShadows,
  overrides
});

export default theme;
