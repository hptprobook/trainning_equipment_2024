import { compilerModal } from '~/models/compilerModal';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';

const saveCode = async (userId, reqBody) => {
  try {
    const savedCode = await compilerModal.saveCode({
      ...reqBody,
      userId,
    });

    return await compilerModal.findOneById(savedCode.insertedId);
  } catch (error) {
    throw error;
  }
};

const listCodeSaved = async (userId) => {
  try {
    const listCodeSaved = await compilerModal.listCodeSaved(userId);

    return listCodeSaved;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (codeId) => {
  const code = await compilerModal.getDetails(codeId);

  if (!code) throw new ApiError(StatusCodes.NOT_FOUND, 'Code not found!');

  return code;
};

const shareCode = async (codeId) => {
  await compilerModal.shareCode(codeId);
};

const codePublicDetail = async (codeId) => {
  const code = await compilerModal.codePublicDetail(codeId);

  if (!code) throw new ApiError(StatusCodes.NOT_FOUND, 'Code not found!');

  return code;
};

const updateCode = async (codeId, reqBody) => {
  const updateData = { ...reqBody, updatedAt: Date.now() };
  const updatedCode = await compilerModal.updateCode(codeId, updateData);

  if (!updatedCode) throw new ApiError(StatusCodes.BAD_REQUEST, 'Cannot update this Code!');

  return updatedCode;
};

export const compilerService = { saveCode, listCodeSaved, getDetails, shareCode, codePublicDetail, updateCode };
