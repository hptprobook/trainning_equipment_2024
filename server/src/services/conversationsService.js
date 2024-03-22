import { conversationsModal } from '~/models/conversationModal';

const addConversations = async (dataConversations) => {
  return await conversationsModal.addConversations(dataConversations);
};
const delConversations = async (idConver) => {
  return await conversationsModal.delConversations(idConver);
};
const conversationsIsArchive = async (idConver, archive) => {
  return await conversationsModal.conversationsIsArchive(idConver, archive);
};
const converUpdateTitle = async (idConver, title) => {
  return await conversationsModal.converUpdateTitle(idConver, title);
};
const converGetAll = async (userId) => {
  return await conversationsModal.converGetAll(userId);
};
const converGetAllIsArchive = async (userId) => {
  return await conversationsModal.converGetAllIsArchive(userId);
};
const converDelAll = async (userId) => {
  return await conversationsModal.converDelAll(userId);
};
export const conversationsService = {
  addConversations,
  delConversations,
  conversationsIsArchive,
  // conversationsIsNotArchive,
  converUpdateTitle,
  converGetAll,
  converGetAllIsArchive,
  converDelAll,
};
