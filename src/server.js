const express = require('express');

const pgp = require('pg-promise')();

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/roamwfriends'
const db = pgp(connectionString);

const server = express();
const port = process.env.PORT || 3000;
const user = require('./routes/users/user');
const profile = require('./routes/users/profile/profile');
const city = require('./routes/cities/city');
const login = require('./routes/login/login');
const review = require('./routes/review');
const index = require('./routes/index');
const auth = require('./routes/auth');
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');

server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');
server.use(express.static('./src/public'));

server.use(session({
  name:'Roam-session',
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
server.use('/login', login);
server.use('/auth', console.log);

// server.use((request, response, next) => {
//   if (request.user) {
//     next();
//   } else {
//     response.redirect('/');
//   }
// });

server.use('/cities', city);
server.use('/reviews', review);
server.use('/users', user);
server.use('/profile', profile);

server.listen(port, (err) => {
  console.log(`<3333333 running server on port ${port} <3333333`);
});
