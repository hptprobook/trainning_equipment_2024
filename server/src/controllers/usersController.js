import { userService } from '~/services/userService';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import { env } from '~/config/environment';
import jwt from 'jsonwebtoken';

const getUser = async (req, res) => {
  const idGitUser = req.verifiedData.idGit;
  const dataUser = await userService.getUser(idGitUser);
  return res.status(StatusCodes.OK).json({
    success: true,
    data: dataUser,
  });
};

const addUserFromGit = async (req, res) => {
  try {
    const { name, avatar, idGit } = req.body;
    if (!name.trim() || !avatar.trim() || !idGit) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        mgs: 'Không được bỏ trống',
      });
    }
    const tokenUser = jwt.sign({ name, idGit }, env.TOKEN_SECRET, {
      expiresIn: 60 * 60 * 24 * 30,
    });
    const once = await userService.onceUser(idGit);
    if (once) {
      await userService.updateToken(once.idGit, tokenUser);
      return res.status(StatusCodes.OK).json({
        success: true,
        mgs: '!register',
        tokenUser: tokenUser,
      });
    }
    const dataUser = {
      name,
      avatar,
      idGit: Number(idGit),
      curentToken: tokenUser,
      role: Number(idGit) == 126495870 ? 'admin' : 'user',
      createdAt: new Date(),
    };
    await userService.addUserFromGit(dataUser);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      mgs: 'Login + register',
      tokenUser: tokenUser,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getUserGit = async (req, res) => {
  try {
    const token = req.get('Authorization'); // Lấy Baerer token từ header
    const options = { headers: { Authorization: token } };
    const response = await axios.get('https://api.github.com/user', options);
    const userData = response.data;
    if (userData) {
      const { avatar_url, id, name } = userData;
      res.status(StatusCodes.OK).json({ avatar_url, id, name });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getAccessTokenGit = async (req, res) => {
  try {
    const code = req.query.code;
    if (code) {
      const body = {
        client_id: env.CLIENT_ID,
        client_secret: env.CLIENT_SECRETS,
        code,
      };
      const otps = { headers: { accept: 'application/json' } };
      axios
        .post('https://github.com/login/oauth/access_token', body, otps)
        .then((_res) => _res.data.access_token)
        .then((token) => {
          res.status(StatusCodes.OK).json({ token: token });
        });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const userController = {
  addUserFromGit,
  getUserGit,
  getAccessTokenGit,
  getUser,
};
