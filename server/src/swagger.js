// import swaggerAutogen from 'swagger-autogen';
const swaggerAutogen = require('swagger-autogen');
const doc = {
  info: {
    title: 'Api',
    description: 'api',
  },
  host: 'localhost:8000',
};

const outputFile = './src/swagger_output.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
