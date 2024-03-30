import Joi from 'joi';
import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

const SAVE_CODE_SCHEMA = Joi.object({
  userId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().max(256),
  code: Joi.string().required().max(2500),
  language: Joi.string().required().valid('py', 'cpp', 'php', 'js'),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  isPublic: Joi.boolean().default(false),
  _destroy: Joi.boolean().default(false),
});

const validateBeforeCreate = async (data) => {
  return await SAVE_CODE_SCHEMA.validateAsync(data, { abortEarly: false });
};

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt'];

const saveCode = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    return await GET_DB()
      .collection('codeSnippets')
      .insertOne({ ...validData, userId: new ObjectId(validData.userId) });
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection('codeSnippets')
      .findOne({ _id: new ObjectId(id) });
    if (!result) throw new Error('Board not found');
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const listCodeSaved = async (userId) => {
  try {
    const result = await GET_DB().collection('codeSnippets').find({ userId: userId, _destroy: false }).toArray();

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetails = async (codeId) => {
  try {
    const result = await GET_DB()
      .collection('codeSnippets')
      .findOne({ _id: new ObjectId(codeId) });
    if (!result) throw new Error('Code snippet not found');
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const shareCode = async (codeId) => {
  try {
    const updateResult = await GET_DB()
      .collection('codeSnippets')
      .findOneAndUpdate({ _id: new ObjectId(codeId) }, { $set: { isPublic: true } }, { returnDocument: 'after' });

    return updateResult || null;
  } catch (error) {
    throw new Error(error.message);
  }
};

const codePublicDetail = async (codeId) => {
  try {
    const result = await GET_DB()
      .collection('codeSnippets')
      .findOne({ _id: new ObjectId(codeId), isPublic: true });

    if (!result) {
      const isExist = await GET_DB()
        .collection('codeSnippets')
        .findOne({ _id: new ObjectId(codeId) });

      if (!isExist) {
        throw new Error('Code snippet not found');
      } else {
        throw new Error('Code snippet has not been published');
      }
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCode = async (codeId, updateData) => {
  try {
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName];
      }
    });

    const existingSnippet = await GET_DB()
      .collection('codeSnippets')
      .findOne({ _id: new ObjectId(codeId) });

    if (!existingSnippet) {
      throw new Error('Code snippet not found');
    }

    const updateResult = await GET_DB()
      .collection('codeSnippets')
      .findOneAndUpdate({ _id: new ObjectId(codeId) }, { $set: updateData }, { returnDocument: 'after' });

    if (!updateResult) {
      throw new Error('Failed to update code snippet');
    }

    return updateResult;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection('codeSnippets')
      .deleteOne({ _id: new ObjectId(id) });
    if (!result) throw new Error('Not found');
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const compilerModel = {
  saveCode,
  findOneById,
  listCodeSaved,
  getDetails,
  shareCode,
  codePublicDetail,
  updateCode,
  deleteOneById,
};
