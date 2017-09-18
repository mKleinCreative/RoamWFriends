const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  response.send('hello');
});

router.get('/signup', (request, response) => {
  response.render('signup', { user: '' });
});

router.get('/login', (request, response) => {
  response.render('login', { user: '' });
});

module.exports = router;
