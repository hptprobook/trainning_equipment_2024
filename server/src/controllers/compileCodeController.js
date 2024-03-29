import { executeFile } from '~/executeLibs';
import generateFile from '~/utils/generateFile';
import { StatusCodes } from 'http-status-codes';

const compilerCode = async (req, res) => {
  const { language = 'js', code } = req.body;

  if (!code) return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Code must be Empty' });

  try {
    const filePath = await generateFile(language, code);

    let output;

    if (language === 'js') output = await executeFile.executeJs(filePath);
    else if (language === 'php') output = await executeFile.executePhp(filePath);
    else if (language === 'py') output = await executeFile.executePy(filePath);

    res.status(StatusCodes.OK).json({ success: true, output: output });
  } catch (error) {
    res.status(StatusCodes.OK).json({ error: error.message });
  }
};

export const compileCodeController = { compilerCode };
