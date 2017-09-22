const { db } = require('./index');

const displayAll = () => {
  return db.any(`
    SELECT
      *
    FROM
      cities
  `, []);
};

const create = (city_name) => {
  return db.one(`
    INSERT INTO
      cities(city_name)
    VALUES
      ($1)
  `, [city_name]);
};

const displayCityByName = (city_name) => {
  return db.any(`
    SELECT
      *
    FROM
      cities
    WHERE
      cities.city_name = $1
  `, [city_name]);
};

const displayCityById = (id) => {
  return db.any(`
    SELECT
      *
    FROM
      cities
    WHERE
      cities.id = $1
  `, [id]);
};

const update = (id, city_name, city_image) => {
  return db.one(`
    UPDATE
      cities
    SET
    (city_name, city_image)
      =
    ($2)
    WHERE
      cities.id = $1
  `, [id, city_name, city_image]);
};

module.exports = {
  displayAll,
  create,
  displayCityByName,
  displayCityById,
  update,
};
