const pgp = require('pg-promise')();

const connectionString = 'postgres://localhost:5432/roamwfriends';
const db = pgp(connectionString);
const bcrypt = require('bcrypt');



module.exports = { db, bcrypt };
