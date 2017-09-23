const express = require('express');

const router = express.Router();
const reviewFunctions = require('../../database/controllers/review');
const userFunctions = require('../../database/controllers/user');

router.get('/:city', (request, response) => {
  const { city } = request.params;

  reviewFunctions.displayCitySpecificReviews(city)
    .then((cityReviews) => {
      console.log('city====>', cityReviews)
      return cityReviews;
    })
    .then((cityReviews) => {
      console.log('city-reviews==>', cityReviews[0].city)
      userFunctions.getById(cityReviews[0].user_id)
        .then((reviewer) => {
        console.log('2city====>', reviewer)
          response.render('cities/view', { reviews: cityReviews, user: reviewer, city: true });
        });
    });
});

module.exports = router;
