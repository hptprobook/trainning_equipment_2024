import axios from 'axios';

const baseURL = import.meta.env.VITE_API_ROOT;
// Function to get the access token from local storage
const getAccessToken = () => localStorage.getItem('token');
const getGitToken = () => localStorage.getItem('git_token');

const request = axios.create({
  baseURL,
  headers: {
    'auth-token': getAccessToken(), // Initial value
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`, // Initial value
    'auth-token': getAccessToken(),
  },
});

// Intercept requests and update the Authorization header
request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  config.headers['auth-token'] = getGitToken();
  return config;
});

export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data;
};
export const post = async (path, options = {}) => {
  const response = await request.post(path, options);
  return response.data;
};
export const put = async (path, options = {}) => {
  const response = await request.put(path, options);
  return response.data;
};
export const patch = async (path, options = {}) => {
  const response = await request.patch(path, options);
  return response.data;
};

export default request;
