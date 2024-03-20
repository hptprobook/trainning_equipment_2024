import { userModal } from '~/models/userModal';

const addUserFromGit = async (dataUser) => {
  return await userModal.addUserFromGit(dataUser);
};
const onceUser = async (idGit) => {
  return await userModal.onceIdGit(idGit);
};
const updateToken = async (idGit, token) => {
  return await userModal.updateToken(idGit, token);
};
const getUser = async (idGit) => {
  return await userModal.getUser(idGit);
};
const getUserById = async (id) => {
  return await userModal.getUserById(id);
};
export const userService = {
  addUserFromGit,
  onceUser,
  updateToken,
  getUser,
  getUserById,
};
