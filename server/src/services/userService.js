import { userModal } from '~/models/userModal';

const addUser = async (dataUser) => {
  return await userModal.addUser(dataUser);
};
const onceUser = async (idGit) => {
  return await userModal.onceIdGit(idGit);
};
const updateToken = async (idGit, token) => {
  return await userModal.updateToken(idGit, token);
};

export const userService = { addUser, onceUser, updateToken };
