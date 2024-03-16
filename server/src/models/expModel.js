import { GET_DB } from '~/config/mongodb';

const collectionName = 'check';

const getCollection = async () => {
  try {
    const db = await GET_DB();
    return db.collection(collectionName);
  } catch (error) {
    throw new Error(error);
  }
};

const addDocumentToTest = async (documentData) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('test');
    const result = await collection.insertOne(documentData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const expModel = { getCollection, addDocumentToTest };
