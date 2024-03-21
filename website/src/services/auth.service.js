import request from '../utils/request';

async function handleRequest(method, url, data) {
  return request[method](url, data).then(res => res.data);
}

const AuthService = {
  getUserGit: (code) => handleRequest('get', `/account/getTokenUser?code=${code}`),
  handleGetUser: () => handleRequest('get', '/account/getUser'),
};

export default AuthService;
