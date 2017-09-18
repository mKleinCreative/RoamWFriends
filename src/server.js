const express = require('express');

const server = express();
const port = process.env.PORT || 3000;
const user = require('./routes/user');
const index = require('./routes/index');

server.set('views', './src/views');
server.set('view engine', 'ejs');
server.use(express.static('./src/public'));

server.use('/', index);
server.use('/users', user);

server.listen(3000, (err) => {
  console.log(`<3333333 running server on port ${port} <3333333`);
});
