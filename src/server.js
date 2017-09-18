const express = require('express');

const server = express();
const router = express.Router();
const port = process.env.PORT || 3000;

server.set('views', './src/views');
server.set('view engine', 'ejs');
server.use(express.static('./src/public'));

router.get('/', (request, response) => {
  response.render('home', { user: 'hi' });
});

server.use('/', router);


server.listen(3000, (err) => {
  console.log(`<3333333 running server on port ${port} <3333333`);
});
