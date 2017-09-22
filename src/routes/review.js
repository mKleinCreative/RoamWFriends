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
    })
});

router.post('/:id/delete', (request, response) => {
  const { id } = request.params;
  reviewFunctions.delete(id)
  .then(() => {
    response.redirect('/users/profile')
  })
})
module.exports = router;
