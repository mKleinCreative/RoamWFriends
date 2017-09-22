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

const getByEmail = (email) => {
  return db.oneOrNone(`
    SELECT *
    FROM users
    WHERE
     email=$1
    `, [email]);
};

const getById = (id) => {
  return db.oneOrNone(`
    SELECT *
    FROM users
    WHERE
     id=$1
     `, [id]);
};

const update = (name, current_city, user_image, id) => {
  return db.any(`
    UPDATE users
    SET (name, current_city, user_image) = ($1,$2,$3)
    WHERE
     id = $4
     RETURNING *
`, [name, current_city, user_image, id]);
};

module.exports = {
  create,
  getByEmail,
  getById,
  update,
};
