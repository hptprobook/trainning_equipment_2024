import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
const addUserFromGit = async (dataUser) => {
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

const getUser = async (idGit) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const dataUser = await collection.findOne({ idGit: idGit });
    return dataUser;
  } catch (error) {
    throw new Error(error);
  }
};
const getUserById = async (id) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const objectId = new ObjectId(id);
    const dataUser = await collection.findOne({ _id: objectId });
    return dataUser;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByIdCheckSecureHash = async (id, secureHash) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const objectId = new ObjectId(id);
    const dataUser = await collection.findOne({
      _id: objectId,
      secureHash: secureHash,
    });
    if (dataUser) {
      return 99;
    } else {
      await collection.updateOne(
        { _id: objectId }, // Điều kiện tìm kiếm
        { $set: { secureHash: secureHash } } // Giá trị cập nhật
      );
      return '00';
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const userModal = {
  addUserFromGit,
  onceIdGit,
  updateToken,
  getUser,
  getUserById,
  getUserByIdCheckSecureHash,
};
