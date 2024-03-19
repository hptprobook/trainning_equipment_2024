import { conversationsModal } from '~/models/conversationModal';

const addConversations = async () => {
  return await conversationsModal.addConversations();
};
export const conversationsService = { addConversations };
