import { useEffect } from 'react';
import axios from 'axios';

const LoginGit = () => {
  const CLIENT_ID = '8edcd9a10c24432f67cb';
  const BASE_URL = 'http://localhost:8017/api/account';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const codeParams = new URLSearchParams(window.location.search).get(
          'code'
        );
        if (codeParams) {
          const {
            data: { token },
          } = await axios.get(
            `${BASE_URL}/getAccessTokenGit?code=${codeParams}`
          );
          if (token) {
            const { data: dataUser } = await axios.get(
              `${BASE_URL}/getUserGit`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (dataUser) {
              const response = await axios.post(`${BASE_URL}/addUser`, {
                name: dataUser.name,
                avatar: dataUser.avatar_url,
                idGit: dataUser.id,
                token: token,
              });
              console.log(response);
            }
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handleLoginGit = (e) => {
    e.preventDefault();
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  };

  const handleLoOutGit = async (e) => {
    e.preventDefault();
    const accessToken = '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';
    const result = await axios.delete(`${BASE_URL}/logout`, {
      data: { access_token: accessToken },
    });
    console.log(result);
  };
  return (
    <div>
      <button onClick={handleLoginGit}>Login with GitHub</button>
      <button onClick={handleLoOutGit}>Logout</button>
    </div>
  );
};

export default LoginGit;
