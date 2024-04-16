// import { useSelector } from 'react-redux';

const useAuth = () => {
  const tokenGit = localStorage.getItem('git_token');

  return tokenGit;
};

export default useAuth;
