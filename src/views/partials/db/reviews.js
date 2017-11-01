const db = require('./db')

const create = function (albums_id, review, users_id) {
  return db.query(`
    INSERT INTO
      reviews (albums_id, review, users_id)
    VALUES
      ($1,$2,$3)
    RETURNING
      *
      `,
      [
        albums_id,
        review,
        users_id
      ])
      .catch(error =>{
        console.error({message:'Error occured while executing reviews.create',
                       arguments: arguments});
      throw error});
}

const findAll = function () {
  return db.query(`
    SELECT
      *
    FROM
      reviews
    ` ,[])
    .catch(error =>{
      console.error({message:'Error occured while executing reviews.findAll',
                     arguments: arguments});
    throw error});
}
const findAllByAlbumId = function (id) {
  return db.query(`
     SELECT
       reviews.id, albums_id, review, users_id,logged,title,artist
     FROM
       reviews
     JOIN
       albums
     ON
       albums_id = albums.id
     WHERE
       albums_id =$1
     ORDER BY
       logged
     DESC
    ` ,[id])
    .catch(error =>{
      console.error({message:'Error occured while executing reviews.findAllByAlbumId',
                     arguments: arguments});
    throw error});
}
const findAllByUserId = function (id) {
  return db.query(`
    SELECT
      reviews.id, albums_id, review, users_id,logged,title,artist
    FROM
      reviews
    JOIN
      albums
    ON
      albums_id = albums.id
    WHERE
      users_id=$1
    ORDER BY
      logged
    DESC
    ` ,[id])
    .catch(error =>{
      console.error({message:'Error occured while executing reviews.findAllByUserId',
                     arguments: arguments});
    throw error});
}

const findById = function (id) {
  return db.any(`
    SELECT
      *
    FROM
      reviews
    WHERE
      id =$1`,
    [id])
    .catch(error =>{
      console.error({message:'Error occured while executing reviews.findById',
                     arguments: arguments});
    throw error});
}


const updateById = function(id,albums_id, review, users_id) {
  return db.one(`
    UPDATE
      reviews
    SET
      (albums_id, review, users_id)
      =
      ($1, $2, $3)
    WHERE
      reviews.id =$1`,
    [
      id,
      albums_id,
      review,
      users_id
    ])
      .catch(error =>{
        console.error({message:'Error occured while executing reviews.findById',
                       arguments: arguments});
      throw error});
}

const destroy = function(id){
  return db.query(`
    DELETE FROM
      reviews
    WHERE
      id =$1`,
      [id])
      .catch(error =>{
        console.error({message:'Error occured while executing reviews.destroy',
                       arguments: arguments});
      throw error});
}

module.exports = {
  create,
  findAll,
  findAllByAlbumId,
  findAllByUserId,
  findById,
  updateById,
  destroy
}
