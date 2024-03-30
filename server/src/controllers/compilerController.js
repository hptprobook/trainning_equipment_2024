import { executeFile } from '~/executeLibs';
import generateFile from '~/utils/generateFile';
import { StatusCodes } from 'http-status-codes';
import { userService } from '~/services/userService';
import { compilerService } from '~/services/compilerService';

const compilerCode = async (req, res) => {
  // #swagger.tags = ['compiler']
  const { language = 'js', code } = req.body;

  if (!code)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Code must be Empty' });

  try {
    const filePath = await generateFile(language, code);

    let output;

    if (language === 'js') output = await executeFile.executeJs(filePath);
    else if (language === 'php')
      output = await executeFile.executePhp(filePath);
    else if (language === 'py') output = await executeFile.executePy(filePath);

    res.status(StatusCodes.OK).json({ success: true, output: output });
  } catch (error) {
    res.status(StatusCodes.OK).json({ error: error.message });
  }
};

const saveCode = async (req, res, next) => {
  // #swagger.tags = ['compiler']
  // #swagger.summary = 'save code'
  try {
    const currentUser = await userService.getUser(req.verifiedData.idGit);

    if (!currentUser)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found!' });

    const savedCode = await compilerService.saveCode(
      currentUser._id.toString(),
      req.body
    );

    res.status(StatusCodes.OK).json(savedCode);
  } catch (error) {
    next(error);
  }
};

const listCodeSaved = async (req, res, next) => {
  // #swagger.tags = ['compiler']
  // #swagger.summary = 'List code save'
  try {
    const currentUser = await userService.getUser(req.verifiedData.idGit);

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
  saveCode,
  listCodeSaved,
  getDetails,
  shareCode,
  codePublicDetail,
  updateCode,
  deleteCodeSaved,
};
