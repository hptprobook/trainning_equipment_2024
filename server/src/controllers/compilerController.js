import { StatusCodes } from 'http-status-codes';
import { userService } from '~/services/userService';
import { compilerService } from '~/services/compilerService';
import axios from 'axios';
import { getFileExtension } from '~/utils/formatters';
import { gptController } from './gptController';
import { env } from '~/config/environment';

const compilerCode = async (req, res) => {
  // #swagger.tags = ['compiler']

  const { language = 'javascript', code } = req.body;
  const fileExtension = getFileExtension(language);

  if (!code)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Code must be Empty' });

  const options = {
    method: 'POST',
    url: env.COMPILER_API_URL,
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': env.COMPILER_X_RAPID_API_KEY,
      'X-RapidAPI-Host': env.COMPILER_X_RAPID_API_HOST,
    },
    data: {
      language,
      stdin: 'null',
      files: [
        {
          name: `index${fileExtension}`,
          content: code,
        },
      ],
    },
  };

  try {
    const response = await axios.request(options);
    res.status(StatusCodes.OK).json(response.data);
  } catch (error) {
    res.status(StatusCodes.OK).json({ error: error.message });
  }
};

const chatResponse = async (req, res) => {
  const { condition, code } = req.body;

  if (!code)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Code must be Empty' });

  const requestContent =
    condition === 'error'
      ? `Detected an error in the following code snippet, suggest solutions for fixing the error: \\n${code}\\n. Return in JSON format {"errors": [{"line": _, "error": ""}], "recommends": "", "correctCode": ""}, with values in Vietnamese. In 'errors', clearly specify what the error is and on which line it occurs in Vietnamese. In 'recommends', specify what needs to be done on which line in Vietnamese. In 'correctCode', return the corrected code and add error-fixing comments above the erroneous line in Vietnamese. Do not use backticks in the returned results. Output should be in JSON format.`
      : `Suggest some ways to refactor the following code snippet: \\n${code}\\n. Return in JSON format {"refactors": [{"direction": "", "code": ""}, (other refactor)]}, with values in Vietnamese (keys are in English). Do not return text. Add comments to changed code. If the code has been optimized, return direction is {["direction": "Đoạn mã đã tối ưu", "code": ""]}.Return content within the JSON should be in Vietnamese. Output should be in JSON format.`;

  try {
    const response = await gptController.gptResponse(requestContent);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    res.status(StatusCodes.OK).json({ error: error.message });
  }
};

const saveCode = async (req, res, next) => {
  // #swagger.tags = ['compiler']
  // #swagger.summary = 'save code'
  try {
    let currentUser;
    if (req.verifiedData.idGit) {
      currentUser = await userService.getUser(req.verifiedData.idGit);
    } else {
      currentUser = await userService.getUserEmail(req.verifiedData.email);
    }
    if (!currentUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found!' });
    }

    const savedCode = await compilerService.saveCode(
      currentUser._id.toString(),
      req.body
    );
    return res.status(StatusCodes.OK).json(savedCode);
  } catch (error) {
    next(error);
  }
};

const listCodeSaved = async (req, res, next) => {
  // #swagger.tags = ['compiler']
  // #swagger.summary = 'List code save'
  try {
    let currentUser;
    if (req.verifiedData.idGit) {
      currentUser = await userService.getUser(req.verifiedData.idGit);
    } else {
      currentUser = await userService.getUserEmail(req.verifiedData.email);
    }
    if (!currentUser)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found!' });

    const listCodeSaved = await compilerService.listCodeSaved(currentUser._id);

    res.status(StatusCodes.CREATED).json(listCodeSaved);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  // #swagger.tags = ['compiler']
  // #swagger.summary = 'get detail'
  try {
    const code = await compilerService.getDetails(req.params.id);

    res.status(StatusCodes.OK).json(code);
  } catch (error) {
    next(error);
  }
};

const shareCode = async (req, res, next) => {
  // #swagger.tags = ['compiler']
  // #swagger.summary = 'share code'
  try {
    await compilerService.shareCode(req.params.id);

    res.status(StatusCodes.OK).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const codePublicDetail = async (req, res, next) => {
  // #swagger.tags = ['compiler']
  try {
    const code = await compilerService.codePublicDetail(req.params.id);

    res.status(StatusCodes.OK).json(code);
  } catch (error) {
    next(error);
  }
};

const updateCode = async (req, res, next) => {
  // #swagger.tags = ['compiler']
  // #swagger.summary = 'update code'
  try {
    await compilerService.updateCode(req.params.id, req.body);

    res.status(StatusCodes.OK).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const deleteCodeSaved = async (req, res, next) => {
  // #swagger.tags = ['compiler']
  // #swagger.summary = 'delete code'
  try {
    await compilerService.deleteCodeSaved(req.params.id);
    res.status(StatusCodes.OK).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const compilerController = {
  compilerCode,
  chatResponse,
  saveCode,
  listCodeSaved,
  getDetails,
  shareCode,
  codePublicDetail,
  updateCode,
  deleteCodeSaved,
};
