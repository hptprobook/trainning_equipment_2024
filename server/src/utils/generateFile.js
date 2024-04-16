import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const dirCodes = path.join(__dirname, '../executedFiles');

const generateFile = async (content) => {
  try {
    // Kiểm tra và tạo thư mục nếu nó không tồn tại
    await fs.mkdir(dirCodes, { recursive: true });

    const jobId = uuid();
    const fileName = `${jobId}.txt`;
    const filePath = path.join(dirCodes, fileName);

    // Ghi file
    await fs.writeFile(filePath, content);

    return filePath;
  } catch (error) {
    throw new Error(error);
  }
};

export default generateFile;
