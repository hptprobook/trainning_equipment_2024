import excelModal from '~/models/excelModal';
import fs from 'fs';
import { parse, write } from 'fast-csv';

export const importData = async (filePath) => {
  console.log(`Importing data from ${filePath}`);
  const stream = fs.createReadStream(filePath);
  const dataArr = [];
  await new Promise((resolve, reject) => {
    parse(stream, { headers: true })
      .on('data', (data) => {
        console.log('Data:', data);
        dataArr.push(data);
      })
      .on('end', async () => {
        try {
          await excelModal.insertMany(dataArr);
          console.log(`Successfully imported ${dataArr.length} rows of data`);
          resolve();
        } catch (error) {
          console.error('Error importing data:', error);
          reject(error);
        }
      });
  });
};

export const exportData = async () => {
  const data = await excelModal.find({});
  const filePath = 'out.csv';
  const ws = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    write(data, { headers: true })
      .pipe(ws)
      .on('finish', () => resolve(filePath))
      .on('error', (error) => reject(error));
  });
};