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
              const response = await axios.post(`${BASE_URL}/addUserFromGit`, {
                name: dataUser.name,
                avatar: dataUser.avatar_url,
                idGit: dataUser.id,
              });
              console.log(response.data);
            }
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const run = async () => {
  //     const tokenUser =
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidHVodjUiLCJpZEdpdCI6MTI2NDk1ODcwLCJpYXQiOjE3MTA4NTAwMDYsImV4cCI6MTcxMzQ0MjAwNn0.DmoZbw86a24eKONVfR8Y4HKFOfz3jNZnW7M59IaHCVc';
  //     const dataUser = await axios.get(`${BASE_URL}/getUser`, {
  //       headers: {
  //         'auth-token': tokenUser,
  //       },
  //     });
  //     console.log(dataUser);
  //   };
  //   run();
  // }, []);

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
