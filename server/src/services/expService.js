import { expModel } from '~/models/expModel';

const getCollection = async () => {
  try {
    const collections = await expModel.getCollection();

    return await collections;
  } catch (error) {
    throw new Error(error);
  }
};

const addDocument = async (documentData) => {
  return await expModel.addDocumentToTest(documentData);
};

export const expService = { getCollection, addDocument };
