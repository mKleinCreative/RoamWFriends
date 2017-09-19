const express = require('express');

const router = express.Router();
const user = require('../database/controllers/user');
const { passport } = require('./auth');


router.get('/signup', (request, response) => {
  response.render('signup', { user: '', message: '' });
});

router.post('/signup', (request, response) => {
  const { email, password, confirmPassword } = request.body;
  const validatePassword = password === confirmPassword;


  if (!validatePassword) {
    return response.render('signup', { user: '', message: 'Passwords don\'t match' });
  }
  user.getUserByEmail(email)
    .then((existingUser) => {
      if (existingUser) {
        return response.render('signup', { user: '', message: 'Accout with this email exists' });
      } else if (!existingUser) {
        user.create(email, password)
          .then((newUser) => {
            response.send({ newUser });
          })
          .catch((error) => {
            console.log('---===error.message===---', error.message);
          });
      }
    }).catch((error) => {
      console.log('---===error.message===---', error.message);
    });
});

router.get('/login', (request, response) => {
  response.render('login', { user: '' });
});

router.post('/login', (request, response, next) => {

  passport.authenticate('local',  (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return response.render('login', { user:'', message: 'Invalid Email or Password' }); }
    request.logIn(user, (err) => {
      if (err) { return next(err); }
      return response.redirect('/profile')
    });
  })(request, response, next);
});

router.get('/profile', (request, response) => {
  response.send('Profile Page');
});

module.exports = router;
