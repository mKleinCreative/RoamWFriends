const db = require('./db')

const findAll = function (){
  return db.query(`
    SELECT
      *
    FROM
      albums
    ` ,[])
    .catch(error =>{
      console.error({message:'Error occured while executing albums.findAll',
                     arguments: arguments});
    throw error});
}

const findById = function (id){
  return db.any(`
    SELECT
      *
    FROM
      albums
    WHERE
      id =$1`,
    [id])
    .catch(error =>{
      console.error({message:'Error occured while executing albums.findById',
                     arguments: arguments});
    throw error});
    }

module.exports = {
  findAll,
  findById
}
