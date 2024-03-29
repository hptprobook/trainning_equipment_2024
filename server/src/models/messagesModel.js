import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import Joi from 'joi';
// import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

const SAVE_CODE_SCHEMA = Joi.object({
  conversationId: Joi.string().required(),
  content: Joi.string().required(),
  isUserMessage: Joi.boolean().default(false),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
});
const validateBeforeCreate = async (data) => {
  return await SAVE_CODE_SCHEMA.validateAsync(data, { abortEarly: false });
};
const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection('messages')
      .findOne({ conversationId: new ObjectId(id) });
    if (!result) throw new Error('Messages not found');
    return result;
  } catch (error) {
    throw new Error(error);
  }
};


const addMessages = async (dataUser) => {
  try {
    const validData = await validateBeforeCreate(dataUser);
    const db = await GET_DB();
    const collection = db.collection('messages');
    const result = await collection.insertOne({
      ...validData,
      conversationId: new ObjectId(validData.conversationId),
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getMessagesbyidConver = async (conversationId) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('messages');
    await findOneById(conversationId);

    const result = await collection
      .find({ conversationId: new ObjectId(conversationId) })
      .sort({ createdAt: 1 })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const delbyidConver = async (conversationId) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('messages');
    const result = await collection.deleteMany({
      conversationId: new ObjectId(conversationId),
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const messageModal = {
  addMessages,
  getMessagesbyidConver,
  delbyidConver,
};
