const express = require('express');

const router = express.Router();
const userFunctions = require('../database/controllers/user');
const reviewFunctions = require('../database/controllers/review');
const { passport } = require('./auth');


router.get('/signup', (request, response) => {
  response.render('signup', { user: request.session.user || null, message: '' });
});

router.post('/signup', (request, response) => {
  const { email, password, confirmPassword } = request.body;
  const validatePassword = password === confirmPassword;


  if (!validatePassword) {
    return response.render('signup', { user: request.session.user || null, message: 'Passwords don\'t match' });
  }
  userFunctions.getUserByEmail(email)
    .then((existingUser) => {
      if (existingUser) {
        return response.render('signup', { user: request.session.user || null, message: 'Accout with this email exists' });
      } else if (!existingUser) {
        userFunctions.create(email, password)
          .then((newUser) => {
            // create cookie here!
            request.login(newUser, (err) => {
              if (err) { return next(err); }
              return response.redirect('/users/profile')
            });
            response.render('profile', { user: newUser, message: '' });
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
  response.render('login', { user: request.session.user || null , message: '' });
});

router.post('/login', (request, response, next) => {

  passport.authenticate('local',  (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return response.render('login', { user: request.session.user || null, message: 'Invalid Email or Password' }); }
    request.login(user, (err) => {
      if (err) { return next(err); }
      return response.redirect('/users/profile')
    });
  })(request, response, next);
});

router.use((req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.redirect('/');
  }
})

router.get('/profile', (request, response) => {
  console.log( '---===request.user.id===---', request.user.id );
  const userId = request.user.id;
  reviewFunctions.displayUserSpecificReviews(userId)
    .then((userReviews) => {
      response.render('profile', { user: request.user, editing: false, reviews: userReviews });
    })
});

router.get('/profile/edit', (request, response) => {
  response.render('profile', { user: request.user , editing: true });
})

router.post('/profile/edit', (request, response) => {
  const {
    name,
    current_city,
    user_image,
    id,
  } = request.body;
  userFunctions.update(name, current_city, user_image, id)
    .then(() => {
      response.redirect('/users/profile/updated');
    }).catch((error) => {
    console.error(error.message);
  });
});

router.get('/profile/updated', (request, response) => {
  response.render('profile', { user: request.user, editing: false });
});

router.get('/review', (request, response) => {
  const userId = request.session.user.id
  console.log( '---===userId===---', userId ); 
  reviewFunctions.displayUserSpecificReviews(userId)
  .then((allUserReviews) => {
    console.log( '---===allUserReviews===---', allUserReviews ); 
    response.render('profile', { user: request.session.user, reviews: allUserReviews });
  });
});


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
