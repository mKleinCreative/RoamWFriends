const express = require('express');

const router = express.Router();
const reviewFunctions = require('../database/controllers/review');

router.get('/', (request, response) => {
  reviewFunctions.displayAll()
    .then((allReviews) => {
      response.render('city', { user: request.session.user, reviews: allReviews });
    });
});

router.post('/new', (request, response) => {
  const user_id = request.session.user.id;
  const {
    type_id,
    title,
    body,
    city,
  } = request.body;
  reviewFunctions.create(user_id, type_id, title, body, city)
    .then((createdUser) => {
      response.redirect('/users/profile')
    })
})

module.exports = router;
