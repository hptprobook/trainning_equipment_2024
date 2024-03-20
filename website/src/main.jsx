import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import CssBaseLine from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import ThemeProvider from './theme/index.jsx';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <CssBaseLine />
    <BrowserRouter>
      <Suspense>
        <ThemeProvider>
          <ToastContainer theme="colored" hideProgressBar position="bottom-left" autoClose={3000} closeOnClick />
          <App />
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
