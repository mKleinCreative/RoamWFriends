const { db } = require('./index');

const create = (email, password) => {
  return db.one(`
    INSERT INTO 
      users (email, password)
    VALUES($1, $2)
    RETURNING *
    `, [email,
      password])
};

module.exports = { create };