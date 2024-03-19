import { conversationsService } from '~/services/conversationsService';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import { env } from '~/config/environment';

const addConversations = async (req, res, next) => {
  try {
    const data = await conversationsService.addConversations();
    return res.status(StatusCodes.CREATED).json({
      u: data,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const conversationsController = {
  addConversations,
};
