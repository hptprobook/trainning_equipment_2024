/* eslint-disable */
import express from 'express';
import { CONNECT_DB } from './config/mongodb';
import { env } from './config/environment';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
import { APIs } from './routes';
import cors from 'cors';
import { corsOptions } from './config/cors';

const START_SERVER = () => {
  const app = express();

  app.use(express.json());

  app.use(cors(corsOptions));

  app.use('/api', APIs);

  app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
  });

  app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Server is running at http://${env.APP_HOST}:${env.APP_PORT}/`);
  });
};

(async () => {
  try {
    await CONNECT_DB();
    console.log('Connect to MongoDB Atlas successfully');
    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();
