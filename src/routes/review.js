const express = require('express');

const router = express.Router();
const reviewFunctions = require('../database/controllers/review');
const userFunctions = require('../database/controllers/user');

router.get('/', (request, response) => {
  reviewFunctions.displayAll()
    .then((allReviews) => {
      response.render('cities/view', { user: request.session.user, reviews: allReviews });
    });
});

router.get('/new', (request, response) => {
  response.render('reviews/create', { user: request.user, message: null });
});

router.post('/', (request, response) => {
  const user_id = request.session.user.id;
  const {
    type_id,
    title,
    body,
    city,
  } = request.body;
  reviewFunctions.create(user_id, type_id, title, body, city)
    .then((createdUser) => {
      response.redirect('/profile')
    });
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  reviewFunctions.displaySingleReview(id)
    .then((cityReviews) => {
      userFunctions.getById(cityReviews.user_id)
        .then((reviewer) => {
          response.render('reviews/viewFull', { reviews: cityReviews, user: reviewer });
        });
    });
});

router.get('/:id/delete', (request, response) => {
  const { id } = request.params;
  reviewFunctions.deleteReview(id)
    .then(() => {
      response.redirect('/profile');
    });
});

router.get('/:id/edit', (request, response) => {
  const { id } = request.params;
  reviewFunctions.displaySingleReview(id)
    .then((cityReview) => {
      userFunctions.getById(cityReview.user_id)
        .then((reviewer) => {
          response.render('reviews/edit', { reviews: cityReview, user: reviewer, message: null });
        });
    });
});

router.post('/:id/edit', (request, response) => {
  const { id } = request.params;
  const {
    type_id,
    title,
    body,
    city,
  } = request.body;
  reviewFunctions.updateReview(id, type_id, title, body, city)
    .then(() => {
      response.redirect('/profile');
    })
    .catch((error) => {
      response.send(error.message);
    });
});

module.exports = router;
