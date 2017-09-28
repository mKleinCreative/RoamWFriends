const express = require('express');

const router = express.Router();
const reviewFunctions = require('../database/controllers/review');
const userFunctions = require('../database/controllers/user');

router.get('/', (request, response) => {
  reviewFunctions.displayAll()
    .then((allReviews) => {
      response.render('cities/view', { user: request.user, reviews: allReviews || null, city: true });
    });
});

router.get('/new', (request, response) => {
  response.render('reviews/create', { user: request.user, reviews: null, message: null, city: false });
});

router.post('/', (request, response) => {
  const {
    type_id,
    title,
    body,
    city,
  } = request.body;
  reviewFunctions.create(request.user.id, type_id, title, body, city)
    .then(() => {
      response.redirect('/profile');
    });
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  reviewFunctions.displaySingleReview(id)
    .then((cityReviews) => {
      userFunctions.getById(cityReviews.user_id)
        .then((reviewer) => {
          response.render('reviews/viewFull', { reviews: cityReviews, user: reviewer, city: null });
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
          console.log('====>',reviewer)
          response.render('reviews/edit', { reviews: cityReview, user: reviewer, message: null, city: null });
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
