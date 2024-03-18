import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import CssBaseLine from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from './theme/theme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <CssVarsProvider theme={theme}>
      <CssBaseLine />
      <BrowserRouter>
        <Suspense>
          <App />
        </Suspense>
      </BrowserRouter>
    </CssVarsProvider>
  </HelmetProvider>
);
