import 'dotenv/config';

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRETS: process.env.CLIENT_SECRETS,
  URL_APP: process.env.URL_APP,
  GITHUB_APP_TOKEN: process.env.GITHUB_APP_TOKEN,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
