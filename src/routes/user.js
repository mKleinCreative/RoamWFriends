const express = require('express');

const router = express.Router();
const user = require('../database/controllers/user');
router.get('/', (request, response) => {
  response.send('hello');
});

router.get('/signup', (request, response) => {
  response.render('signup', { user: '', message: '' });
});

router.post('/signup', (request, response) => {
  const { email, password, confirmPassword } = request.body;
  const validatePassword = password === confirmPassword;


  if (!validatePassword) {
    return response.render('signup', { user: '', message: 'Passwords don\'t match' });
  }
  user.getUserByEmail(email)
   .then((existingUser)=>{

     if (existingUser) {
       return response.render('signup', { user: '', message: 'Accout with this email exists' });
     }else if (!existingUser){
       user.create(email, password)
         .then((newUser) => {
           response.send({ newUser });
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
  response.render('login', { user: '' });
});

module.exports = router;
