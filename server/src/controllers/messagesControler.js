import { StatusCodes } from 'http-status-codes';
import { messagesService } from '~/services/messagesService';
const addMess = async (req, res) => {
  const data = req.body;
  const dataMess = await messagesService.addMessages(data);
  return res.status(StatusCodes.OK).json({
    success: true,
    dataMess,
  });
};
const getMessagesbyidConver = async (req, res) => {
  const { idConver } = req.params;
  const dataMess = await messagesService.getMessagesbyidConver(idConver);
  return res.status(StatusCodes.OK).json({
    success: true,
    dataMess,
  });
};
export const messagesController = {
  addMess,
  getMessagesbyidConver,
};
