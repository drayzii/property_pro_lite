import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgres://postgres:native@localhost:5432/pplite',
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
