const { Pool } = require('pool')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'social',
  password: 'Tariq@1234',
  port: 5432,
})

module.exports = pool