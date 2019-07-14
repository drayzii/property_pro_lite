import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgres://hsqeaumj:rsmf1K0OS30cyPmK8mW8R4hTVLISt-PP@raja.db.elephantsql.com:5432/hsqeaumj',
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
