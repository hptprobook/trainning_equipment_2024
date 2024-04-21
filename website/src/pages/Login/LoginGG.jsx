import { Button } from '@mui/material';
import './style.css';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/FireBaseConfig';
import GoogleIcon from '@mui/icons-material/Google';
import AuthService from '../../services/auth.service';
import { handleToast } from '../../config/toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '~/context/user.context';
import { useContext } from 'react';
const LoginGG = () => {
  const { setLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLoginG = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const dataUser = {
          name: user.displayName,
          email: user.email,
          avatar:
            user.photoURL == '[URL]'
              ? 'https://i.pinimg.com/564x/ac/a3/27/aca3270e1bfcb034363463172320f63c.jpg'
              : user.photoURL,
        };
        const add = await AuthService.addUserGg(dataUser);
        localStorage.setItem('token', add.tokenUser);
        setLogin(true);

        handleToast('success', 'Đăng nhập thành công!');
        const history = JSON.parse(localStorage.getItem('history'));
        if (history) {
          localStorage.removeItem('history');
          navigate(history);
        } else {
          navigate('/compiler');
        }
      })
      .catch(() => {
        handleToast('error', 'Đăng nhập thất bại');
      });
  };
  return (
    <Button
      onClick={handleLoginG}
      sx={{
        fontSize: '1rem',
        fontWeight: '500',
        backgroundColor: 'rgb(31, 179, 74)',
        color: 'rgba(255,255,255,1)',
        padding: '10px 24px',
        width: '300px',
        marginTop: '8px',
        borderRadius: '8px',
        '&:hover': {
          backgroundColor: 'rgba(31, 179, 74, 0.9)',
        },
      }}
    >
      Đăng nhập với Google{' '}
      <GoogleIcon
        sx={{
          marginLeft: '6px',
        }}
      />
    </Button>
  );
};

export default LoginGG;
