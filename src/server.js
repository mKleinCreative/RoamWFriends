const express = require('express');

const pgp = require('pg-promise')();

const connectionString = 'postgres://localhost:5432/roamwfriends';
const db = pgp(connectionString);

const server = express();
const port = process.env.PORT || 3000;
const user = require('./routes/user');
const index = require('./routes/index');
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');

server.set('views', './src/views');
server.set('view engine', 'ejs');
server.use(express.static('./src/public'));

server.use(session({
  store: new pgSession({
    conString: connectionString,
  }),
  secret: 'catrunlongtimeamirite',
  resave: true,
  cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
  saveUninitialized: true,
}));

server.use(passport.initialize());
server.use(passport.session());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/', index);
server.use('/users', user);

server.listen(3000, (err) => {
  console.log(`<3333333 running server on port ${port} <3333333`);
});
