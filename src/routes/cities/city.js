const express = require('express');

const router = express.Router();
const cityFunctions = require('../../database/controllers/city');

router.get('/', (request, response) => {
  cityFunctions.displayAll()
    .then((cities) => {
      response.json({ city: cities });
    });
});

router.post('/', (request, response) => {
  const { city_name } = request.body;
  cityFunctions.create(city_name)
    .then((newCity) => {
      response.json({ city: newCity });
    });
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  cityFunctions.displayCityById(id)
    .then((returnedCity) => {
      response.json({ returnedCity });
    });
});

// router.get('/:name', (request, response) => {
//   const { name } = request.params
//   cityFunctions.displayCityByName(name)
//     .then((city) => {
//       response.json({ city });
//     });
// });

router.post('/:id', (request, response) => {
  const { id } = request.params;
  const { city_name, city_image } = request.body;
  cityFunctions.update(id, city_name, city_image)
    .then((updatedCity) => {
      response.json({ updatedCity });
    });
});

module.exports = router;
