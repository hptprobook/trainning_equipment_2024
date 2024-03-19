import { GET_DB } from '~/config/mongodb';
const addConversations = async (idGit, token) => {
  try {
    // const db = await GET_DB();
    // const collection = db.collection('users');
    // const result = await collection.updateOne(
    //   { idGit: idGit },
    //   {
    //     $set: {
    //       curentToken: token,
    //     },
    //   }
    // );
    const result = 1;
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const conversationsModal = { addConversations };
