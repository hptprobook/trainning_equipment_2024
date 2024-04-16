import { toast, Bounce } from 'react-toastify';

const configToast = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
};
export const handleToast = (type, message) => {
  toast[type](message, configToast);
};