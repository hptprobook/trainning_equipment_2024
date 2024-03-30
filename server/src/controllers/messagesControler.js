import { StatusCodes } from 'http-status-codes';
import { messagesService } from '~/services/messagesService';
const addMess = async (req, res) => {
  // #swagger.tags = ['message']
  // #swagger.summary = 'add'
  const data = req.body;
  const dataMess = await messagesService.addMessages(data);
  return res.status(StatusCodes.OK).json({
    success: true,
    dataMess,
  });
};
const getMessagesbyidConver = async (req, res) => {
  // #swagger.tags = ['message']
  // #swagger.summary = 'get all'
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
