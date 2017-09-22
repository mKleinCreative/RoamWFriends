const express = require('express');

const router = express.Router();
const reviewFunctions = require('../../../database/controllers/review');
const userFunctions = require('../../../database/controllers/user');


router.get('/', (request, response) => {
  const userId = request.user.id;
  reviewFunctions.displayUserSpecificReviews(userId)
    .then((userReviews) => {
      response.render('users/profile', { user: request.user, editing: false, reviews: userReviews });
    });
});

router.get('/edit', (request, response) => {
  reviewFunctions.displayUserSpecificReviews(request.user.id)
    .then((reviews) => {
      response.render('users/profile', { user: request.user, editing: true, reviews });
    });
});

router.post('/edit', (request, response) => {
  const {
    name,
    current_city,
    user_image,
    id,
  } = request.body;
  userFunctions.update(name, current_city, user_image, id)
    .then(() => {
      response.redirect('/profile/updated');
    }).catch((error) => {
      console.error(error.message);
    });
});

router.get('/updated', (request, response) => {
  reviewFunctions.displayUserSpecificReviews(request.user.id)
    .then((reviews) => {
      response.render('users/profile', { user: request.user, editing: false, reviews });
    });
});

router.get('/review', (request, response) => {
  const userId = request.user.id
  console.log( '---===userId===---', userId );
  reviewFunctions.displayUserSpecificReviews(userId)
    .then((allUserReviews) => {
      console.log( '---===allUserReviews===---', allUserReviews ); 
      response.render('users/profile', { user: request.session.user, reviews: allUserReviews });
    });
});

module.exports = router;
