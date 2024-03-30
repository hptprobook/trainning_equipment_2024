import { compilerModel } from '~/models/compilerModel';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';

const saveCode = async (userId, reqBody) => {
  try {
    const savedCode = await compilerModel.saveCode({
      ...reqBody,
      userId,
    });

    return await compilerModel.findOneById(savedCode.insertedId);
  } catch (error) {
    throw error;
  }
};

const listCodeSaved = async (userId) => {
  try {
    const listCodeSaved = await compilerModel.listCodeSaved(userId);

    return listCodeSaved;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (codeId) => {
  const code = await compilerModel.getDetails(codeId);

  if (!code) throw new ApiError(StatusCodes.NOT_FOUND, 'Code not found!');

  return code;
};

const shareCode = async (codeId) => {
  await compilerModel.shareCode(codeId);
};

const codePublicDetail = async (codeId) => {
  const code = await compilerModel.codePublicDetail(codeId);

  if (!code) throw new ApiError(StatusCodes.NOT_FOUND, 'Code not found!');

  return code;
};

const updateCode = async (codeId, reqBody) => {
  const updateData = { ...reqBody, updatedAt: Date.now() };
  const updatedCode = await compilerModel.updateCode(codeId, updateData);

  if (!updatedCode) throw new ApiError(StatusCodes.BAD_REQUEST, 'Cannot update this Code!');

  return updatedCode;
};

const deleteCodeSaved = async (codeId) => {
  await compilerModel.deleteOneById(codeId);

  return { deleteResult: 'Deleted successfully!' };
};

export const compilerService = { saveCode, listCodeSaved, getDetails, shareCode, codePublicDetail, updateCode, deleteCodeSaved };
