const pgp = require('pg-promise')()
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/phase-4-challenge3'
const db = pgp(connectionString)

module.exports = db
