const { db, bcrypt } = require('./index');

const saltRounds = 12;

const create = (email,password) => {
  return bcrypt.hash(password, saltRounds)
    .then((hash) => {
      return db.one(`
      INSERT INTO
        users (email, password)
      VALUES($1, $2)
      RETURNING *
      `, [email, hash]);
    });
};

const getUserByEmail = (email) => {
  return db.oneOrNone(`
    SELECT
     email
    FROM users
    WHERE
     email=$1
    `,[email])
}

module.exports = { create,
                   getUserByEmail,
                 };
