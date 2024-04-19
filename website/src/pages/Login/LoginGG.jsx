import { Button, Card } from '@mui/material';
import './style.css';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../../firebase/FireBaseConfig';
import GoogleIcon from '@mui/icons-material/Google';
import AuthService from '../../services/auth.service';
import { handleToast } from '../../config/toast';
import { useNavigate } from 'react-router-dom';
const LoginGG = () => {
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
        await localStorage.setItem('token', add.tokenUser);
        handleToast('success', 'Đăng nhập thành công!');
        navigate('/chat');
      })
      .catch((error) => {
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
