const { db } = require('./index');

const displayAll = () => {
  return db.any(`
    SELECT
      *
    FROM
      reviews
  `, []);
};

const create = (user_id, type_id, title, body, city) => {
  return db.any(`
    INSERT INTO
      reviews(user_id, type_id, title, body, city)
    VALUES 
      ($1, $2, $3, $4, $5)
  `, [user_id, type_id, title, body, city])
};

const displaySingleReview = (id) => {
  return db.one(`
    SELECT
      *
    FROM
      reviews
    WHERE
    reviews.id = $1
  `, [id])
};

const displayUserSpecificReviews = (user_id) => {
  return db.any(`
    SELECT
      *
    FROM
      reviews
    WHERE
      reviews.user_id = $1
  `, [user_id]);
};

const displayCitySpecificReviews = (city) => {
  return db.any(`
    SELECT
      *
    FROM
      reviews
    WHERE
      reviews.city = $1
  `, [city]);
};

const updateReview = (id, type_id, title, body, city) => {
  return db.none(`
    UPDATE
      reviews
    SET
    (type_id, title, body, city)
      =
    ($2, $3, $4, $5)
    WHERE
      reviews.id = $1
  `, [id, type_id, title, body, city]);
};

const deleteReview = (id) => {
  return db.none(`
    DELETE FROM
      reviews
    WHERE
      reviews.id = $1
  `, [id]);
};


module.exports = {
  displayAll,
  create,
  displaySingleReview,
  displayUserSpecificReviews,
  displayCitySpecificReviews,
  updateReview,
  deleteReview,
};
