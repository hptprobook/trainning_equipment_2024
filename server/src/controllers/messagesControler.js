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
  const id = req.params;
  try {
    const dataMess = await messagesService.getMessagesbyidConver(id);
    return res.status(StatusCodes.OK).json({
      success: true,
      dataMess,
    });
  }
  catch (error) {
    return res.status(StatusCodes.FAILED_DEPENDENCY).json({
      error: error.message,
      success: false,
    });
  }
};
export const messagesController = {
  addMess,
  getMessagesbyidConver,
};
