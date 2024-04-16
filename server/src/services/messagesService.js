import { messageModal } from '~/models/messagesModel';

const addMessages = async (dataMess) => {
  return await messageModal.addMessages(dataMess);
};
const getMessagesbyidConver = async (idConver) => {
  return await messageModal.getMessagesbyidConver(idConver);
};
const getMessagesTodayByType = async (idUser, type) => {
  return await messageModal.getMessagesTodayByType(idUser, type);
};
const delbyidConver = async (idConver) => {
  return await messageModal.delbyidConver(idConver);
};
export const messagesService = {
  addMessages,
  getMessagesbyidConver,
  delbyidConver,
  getMessagesTodayByType,
};
