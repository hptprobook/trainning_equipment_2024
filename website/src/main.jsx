import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import CssBaseLine from '@mui/material/CssBaseline';
import ThemeProvider from './theme/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <CssBaseLine />
    <BrowserRouter>
      <Suspense>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
