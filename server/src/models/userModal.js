import { GET_DB } from '~/config/mongodb';
const addUser = async (dataUser) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const result = await collection.insertOne(dataUser);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const updateToken = async (idGit, token) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const result = await collection.updateOne(
      { idGit: idGit },
      {
        $set: {
          curentToken: token,
        },
      }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const onceIdGit = async (idGit) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const existingUser = await collection.findOne({
      idGit: idGit,
    });
    return existingUser;
  } catch (error) {
    throw new Error(error);
  }
};
export const userModal = { addUser, onceIdGit, updateToken };