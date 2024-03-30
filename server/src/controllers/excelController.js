import * as excelService from '../services/excelService';

export const importData = async (req, res) => {
  // #swagger.tags = ['excel']
  // #swagger.summary = 'import data'
  if (!req.file) {
    return res.status(400).send('No file was uploaded');
  }

  try {
    await excelService.importData(req.file.path);
    res.status(200).send('Data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).send('Error importing data');
  }
};

export const exportData = async (req, res) => {
  // #swagger.tags = ['excel']
  // #swagger.summary = 'export data'
  try {
    const filePath = await excelService.exportData();
    res.status(200).download(filePath);
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).send('Error exporting data');
  }
};
