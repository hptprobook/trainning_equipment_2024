import { useEffect } from 'react';
import axios from 'axios';

const LoginGit = () => {
  const CLIENT_ID = '8edcd9a10c24432f67cb';
  const BASE_URL = 'http://localhost:8000/api/account';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const codeParams = new URLSearchParams(window.location.search).get(
          'code'
        );
        if (codeParams) {
          // get token user
          const dataToken = await axios.get(
            `${BASE_URL}/getTokenUser?code=${codeParams}`
          );
          if (dataToken) {
            if (dataToken.data.success) {
              // token
              const token = dataToken.data.addUser.tokenUser;
              console.log(token);
              // get data user from db
              const user = await getUser(token);
              console.log(user);
            }
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const getUser = async (tokenUser) => {
    const dataUser = await axios.get(`${BASE_URL}/getUser`, {
      headers: {
        'auth-token': tokenUser,
      },
    });
    return dataUser;
  };

  const handleLoginGit = (e) => {
    e.preventDefault();
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  };
  return (
    <div>
      <button onClick={handleLoginGit}>Login with GitHub</button>
    </div>
  );
};

export default LoginGit;
