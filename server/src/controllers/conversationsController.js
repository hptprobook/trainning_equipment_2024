import { conversationsService } from '~/services/conversationsService';
import { StatusCodes } from 'http-status-codes';
import { userService } from '~/services/userService';
const addConversations = async (req, res) => {
  try {
    const dataU = req.verifiedData;
    const dataUser = await userService.getUser(dataU.idGit);
    if (dataUser) {
      const userId = String(dataUser._id);
      const { title } = req.body;
      if (!title.trim()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          mgs: 'Thiếu thông tin',
        });
      }
      const dataConversations = {
        userId,
        title,
        isArchive: false,
      };
      const data = await conversationsService.addConversations(
        dataConversations
      );
      return res.status(StatusCodes.CREATED).json({
        success: true,
        mgs: title,
        conversationId: data.insertedId,
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      mgs: 'Lỗi không tìm thấy user',
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message, success: false });
  }
};
const delConversations = async (req, res) => {
  try {
    const { idConver } = req.body;
    if (!idConver) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        mgs: 'Không bỏ trống',
      });
    }
    const data = await conversationsService.delConversations(idConver);
    return res.status(StatusCodes.OK).json({
      success: true,
      mgs: 'Xóa thành công',
      data: data,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message, success: false });
  }
};

const converUpdateIsArchive = async (req, res) => {
  try {
    const { idConver, archive = false } = req.body;

    if (!idConver) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        mgs: 'Không bỏ trống',
      });
    }
    if (typeof archive != 'boolean') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        mgs: 'data archive is not boolean',
      });
    }
    const data = await conversationsService.conversationsIsArchive(
      idConver,
      archive
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      mgs: 'Update archive success',
      data: data,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message, success: false });
  }
};
const converUpdateTitle = async (req, res) => {
  try {
    const { idConver, title } = req.body;
    if (!idConver || !title) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        mgs: 'Không bỏ trống',
      });
    }
    const data = await conversationsService.converUpdateTitle(idConver, title);
    return res.status(StatusCodes.OK).json({
      success: true,
      mgs: 'Update title success',
      data: data,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message, success: false });
  }
};

const converGetAll = async (req, res) => {
  try {
    const dataU = req.verifiedData;
    const dataUser = await userService.getUser(dataU.idGit);
    if (dataUser) {
      const userId = String(dataUser._id);
      const data = await conversationsService.converGetAll(userId);
      return res.status(StatusCodes.OK).json({
        success: true,
        mgs: 'all conversations',
        data: data,
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      mgs: 'Lỗi không tìm thấy user',
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message, success: false });
  }
};

const converGetAllIsArchive = async (req, res) => {
  try {
    const dataU = req.verifiedData;
    const dataUser = await userService.getUser(dataU.idGit);
    if (dataUser) {
      const userId = String(dataUser._id);
      const data = await conversationsService.converGetAllIsArchive(userId);
      return res.status(StatusCodes.OK).json({
        success: true,
        mgs: 'all conversations is archive',
        data: data,
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      mgs: 'Lỗi không tìm thấy user',
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message, success: false });
  }
};

const converDelAll = async (req, res) => {
  try {
    const data = req.verifiedData;
    const dataUser = await userService.getUser(data.idGit);
    if (dataUser) {
      const userId = String(dataUser._id);
      const data = await conversationsService.converDelAll(userId);
      return res.status(StatusCodes.OK).json({
        success: true,
        mgs: 'Delete all success',
        data: data,
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      mgs: 'Lỗi không tìm thấy user',
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message, success: false });
  }
};
export const conversationsController = {
  addConversations,
  delConversations,
  converUpdateIsArchive,
  // converUpdateIsNotArchive,
  converUpdateTitle,
  converGetAll,
  converGetAllIsArchive,
  converDelAll,
};
