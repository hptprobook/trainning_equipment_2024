import { Button, Card } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import './style.css';
const LoginView = () => {
  return (
    <div className="login-container">
      <h2 className='logo'>Support Learning IT</h2>
      <div className="content f-col">
        <h2 className="title ml">Support Learning IT</h2>
        <p className='context ml'>
                    Công cụ hỗ trợ tốt nhất dành cho sinh viên IT
        </p>
      </div>
      <div className="login f-col">
        <h2 className='title'>Đăng nhập</h2>
        <div className="button">
          <Button
            size="large"
            sx={{
              width: 'fit-content',
              fontSize: '1rem',
              fontWeight: '500',
              backgroundColor: 'rgba(60, 70, 255)',
              color: 'rgba(255,255,255,1)',
              padding: '8px 24px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgb(0, 0, 255)',
              },
            }}
          >
                        Đăng nhập với GitHub
            <GitHubIcon
              sx={{
                marginLeft: '10px',
              }} />
            {/* <Iconify icon="eva:google-fill" color="#DF3E30" /> */}
          </Button>
        </div>
        <div className="footer">
            <a href="fb.com">Điều khoản và dịch vụ</a>
            <a href="fb.com">Liên hệ</a>
        </div>
      </div>
    </div>
  );
};

export default LoginView;