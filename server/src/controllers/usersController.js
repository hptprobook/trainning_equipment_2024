import { userService } from '~/services/userService';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import { env } from '~/config/environment';

const addUser = async (req, res, next) => {
  try {
    const { name, avatar, idGit, token } = req.body;
    if (!name.trim() || !avatar.trim() || !idGit) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        mgs: 'Không được bỏ trống',
      });
    }
    const once = await userService.onceUser(idGit);
    if (once) {
      await userService.updateToken(once.idGit, token);
      return res.status(StatusCodes.OK).json({
        success: true,
        mgs: '!register',
        data: token,
      });
    }
    const dataUser = {
      name,
      avatar,
      idGit: Number(idGit),
      curentToken: token,
      createdAt: new Date(),
    };
    await userService.addUser(dataUser);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      mgs: 'Login + register',
      u: dataUser,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getUserGit = async (req, res, next) => {
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

const getAccessTokenGit = async (req, res, next) => {
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

// const logOut = async (req, res, next) => {
//   try {
//     const client_id = env.CLIENT_ID;
//     const GITHUB_APP_TOKEN = env.GITHUB_APP_TOKEN;
//     const { access_token } = req.body;
//     const response = await axios.delete(
//       `https://api.github.com/applications/${client_id}/tokens/${access_token}`,
//       {
//         headers: {
//           Authorization: `Bearer ${GITHUB_APP_TOKEN}`,
//           Accept: 'application/vnd.github.v3+json',
//         },
//       }
//     );
//     res.status(200).json(response);
//   } catch (error) {
//     console.error('Error revoking token:', error.response.data);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
const logOut = async (req, res, next) => {
  try {
    const client_id = process.env.CLIENT_ID;
    const { access_token } = req.body;
    // const response = await axios.delete(
    //   `https://api.github.com/applications/${client_id}/token`,
    //   {
    //     headers: {
    //       Accept: 'application/vnd.github+json',
    //     },
    //   },
    //   {
    //     access_token: access_token,
    //   }
    // );
    res.status(200).json({ message: client_id });
  } catch (error) {
    console.error('Error revoking token:', error.response.data);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const userController = {
  addUser,
  getUserGit,
  getAccessTokenGit,
  logOut,
};
