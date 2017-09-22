const express = require('express');

const router = express.Router();
const reviewFunctions = require('../../database/controllers/review');
const userFunctions = require('../../database/controllers/user');

router.get('/:city', (request, response) => {
  const { city } = request.params;
  console.log("city", city)
  reviewFunctions.displayCitySpecificReviews(city)
    .then((cityReviews) => {
      userFunctions.getById(cityReviews.user_id)
        .then((reviewer) => {
          response.render('cities/view', { reviews: cityReviews, user: reviewer, city: true });
        });
    });
});

module.exports = router;
