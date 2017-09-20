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
  return db.one(`
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

const updateReview = (user_id) => {
  return db.none(`
    UPDATE
      reviews
    SET
    (type_id, title, body, city)
      =
    ($2, $3, $4, $5)
    WHERE
      reviews.user_id = $1
  `, [user_id, type_id, title, body, city]);
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
  updateReview,
  deleteReview,
};