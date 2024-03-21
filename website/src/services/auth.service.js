import request from '../utils/request';

async function handleRequest(method, url, data) {
  try {
    const res = await request[method](url, data);
    console.log(url);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const AuthService = {
  getAccessTokenGit: (code) => handleRequest('get', `/account/getAccessTokenGit?code=${code}`),
  getUserGit: () => handleRequest('get', '/account/getUserGit'),
  addUserFromGit: (data) => handleRequest('post', '/account/addUserFromGit', data),
};

export default AuthService;
