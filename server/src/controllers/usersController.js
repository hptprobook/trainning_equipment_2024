import { userService } from '~/services/userService';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import { env } from '~/config/environment';
import jwt from 'jsonwebtoken';

const getUser = async (req, res) => {
  // #swagger.tags = ['user']
  // #swagger.summary = 'get user'
  const idGitUser = req.verifiedData.idGit;
  const dataUser = await userService.getUser(idGitUser);
  return res.status(StatusCodes.OK).json({
    success: true,
    dataUser,
  });
};

const addUserFromGit = async (avatar, idGit, name) => {
  if (!name || !avatar || !idGit) {
    return {
      success: false,
      mgs: 'Không được bỏ trống',
    };
  }
  const tokenUser = jwt.sign({ name, idGit }, env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });
  const once = await userService.onceUser(idGit);
  if (once) {
    await userService.updateToken(once.idGit, tokenUser);
    return {
      success: true,
      mgs: '!register',
      tokenUser,
    };
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
  return {
    success: true,
    mgs: 'Login + register',
    tokenUser,
  };
};

const getUserGit = async (token) => {
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get('https://api.github.com/user', options);
  const userDataFromGit = response.data;
  if (userDataFromGit) {
    return userDataFromGit;
  }
};

const getAccessTokenGit = async (req, res) => {
  // #swagger.tags = ['user']
  // #swagger.summary = 'get access from token code'
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
        .then(async (token) => {
          if (token) {
            const userData = await getUserGit(token);
            const { avatar_url, id, name } = userData;
            const addUser = await addUserFromGit(avatar_url, id, name);
            res.status(StatusCodes.OK).json({ success: true, addUser });
          } else {
            res.status(StatusCodes.BAD_REQUEST).json({
              success: false,
              mgs: 'Lỗi code hoặc code đã sử dụng',
            });
          }
        });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message, success: false });
  }
};

export const userController = {
  getAccessTokenGit,
  getUser,
};
