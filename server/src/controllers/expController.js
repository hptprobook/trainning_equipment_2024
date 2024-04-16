import { expService } from '~/services/expService';
import { StatusCodes } from 'http-status-codes';

const getCollection = async (req, res, next) => {
  // #swagger.tags = ['exp']
  // #swagger.summary = ''
  try {
    const collections = await expService.getCollection();

    res.status(StatusCodes.OK).json(collections);
  } catch (error) {
    next(error);
  }
};

const addDocument = async (req, res, next) => {
  // #swagger.tags = ['exp']
  // #swagger.summary = ''
  try {
    const documentData = req.body;
    const result = await expService.addDocument(documentData);

    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

export const expController = { getCollection, addDocument };
