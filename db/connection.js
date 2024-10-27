const { Pool } = require('pg');

// Set up PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
