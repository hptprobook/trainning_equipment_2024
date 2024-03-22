import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import { messagesService } from '~/services/messagesService';
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
    const delMess = await messagesService.delbyidConver(id);
    const result = await collection.deleteOne({ _id: objectId });
    return { result, delMess };
  } catch (error) {
    throw new Error(error);
  }
};
const conversationsIsArchive = async (id, archive) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('conversations');
    const objectId = new ObjectId(id);
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: { isArchive: archive } }
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
    const conversations = await collection.find({ userId: userId }).toArray();
    await Promise.all(
      conversations.map(async (conversation) => {
        await messagesService.delbyidConver(String(conversation._id));
      })
    );
    const resultAll = await collection.deleteMany({ userId: userId });
    return resultAll;
  } catch (error) {
    throw new Error(error);
  }
};

export const conversationsModal = {
  addConversations,
  delConversations,
  conversationsIsArchive,
  converUpdateTitle,
  converGetAll,
  converGetAllIsArchive,
  converDelAll,
};
