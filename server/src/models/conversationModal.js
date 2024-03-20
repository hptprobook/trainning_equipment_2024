import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';

const addConversations = async (dataConversations) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('conversations');
    const result = await collection.insertOne(dataConversations);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const delConversations = async (id) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('conversations');
    const objectId = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectId });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const conversationsIsArchive = async (id) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('conversations');
    const objectId = new ObjectId(id);
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: { isArchive: true } }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const conversationsIsNotArchive = async (id) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('conversations');
    const objectId = new ObjectId(id);
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: { isArchive: false } }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const converUpdateTitle = async (id, title) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('conversations');
    const objectId = new ObjectId(id);
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: { title: title } }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const converGetAll = async (userId) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('conversations');
    const result = await collection
      .find({ isArchive: false, userId: userId })
      .sort({ createdAt: -1 })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const converGetAllIsArchive = async (userId) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('conversations');
    const result = await collection
      .find({ isArchive: true, userId: userId })
      .sort({ createdAt: -1 })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const converDelAll = async (userId) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('conversations');
    const result = await collection.deleteMany({ userId: userId });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const conversationsModal = {
  addConversations,
  delConversations,
  conversationsIsArchive,
  conversationsIsNotArchive,
  converUpdateTitle,
  converGetAll,
  converGetAllIsArchive,
  converDelAll,
};
