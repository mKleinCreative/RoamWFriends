const express = require('express');

const server = express();
const router = express.Router();
const port = process.env.PORT || 3000;

router.get('/', (request, response) => {
  response.send('hello raom');
});

server.use('/', router);

server.listen(3000, (err) => {
  console.log(`<3333333 running server on port ${port} <3333333`);
});
