const db = require('./db')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const create = function (username, password, email) {
  return bcrypt.hash(password, saltRounds)
  .then((hash)=> {
    return db.query(`
      INSERT INTO
      users ( username, password, email)
      VALUES
      ($1,$2,$3)
      RETURNING
      *
      `,
      [
        username,
        hash,
        email
      ]);
  });
}


const findAll = function () {
  return db.query(`
    SELECT
      *
    FROM
      users
    ` ,[])
    .catch(error =>{
      console.error({message:'Error occured while executing users.findAll',
                     arguments: arguments});
    throw error});
}

const findById = function (id) {
  return db.query(`
    SELECT
      *
    FROM
      users
    WHERE
      id =$1`,
    [id])
    .catch(error =>{
      console.error({message:'Error occured while executing users.findById',
                     arguments: arguments});
    throw error});
}
const findByEmail = function (email) {
  return db.oneOrNone(`
    SELECT
      *
    FROM
      users
    WHERE
      email =$1`,
    [email])
    .catch(error =>{
      console.error({message:'Error occured while executing reviews.findByEmail',
                     arguments: arguments});
    throw error});
}
const updateById = function(id, username, password, email, user_image) {
  return db.one(`
    UPDATE
      users
    SET
      ( username, password, email, user_image)
      =
      ($1, $2, $3, $4)
    WHERE
      users.id =$1`,
    [
      id,
      username,
      password,
      email,
      user_image
    ])
      .catch(error =>{
        console.error({message:'Error occured while executing users.findById',
                       arguments: arguments});
      throw error});
}



module.exports = {
  create,
  findAll,
  findById,
  findByEmail,
  updateById
}
