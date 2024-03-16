import express from 'express';

const app = express();

const hostname = 'localhost';
const port = 8000;

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1><hr>');
});

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Hello World, I am running at http://${hostname}:${port}/`);
});
