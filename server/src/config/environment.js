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
  COMPILER_API_URL: process.env.COMPILER_API_URL,
  COMPILER_X_RAPID_API_KEY: process.env.COMPILER_X_RAPID_API_KEY,
  COMPILER_X_RAPID_API_HOST: process.env.COMPILER_X_RAPID_API_HOST,
  VNPAY_TMNCODE: process.env.VNPAY_TMNCODE,
  VNPAY_SECRET_KEY: process.env.VNPAY_SECRET_KEY,
  VNPAY_VNP_URL: process.env.VNPAY_VNP_URL,
  VNPAY_RETURN_URL: process.env.VNPAY_RETURN_URL,
};
