import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_URL_TEST;
} else {
  connectionString = process.env.DATABASE_URL;
}
const pool = new Pool({
  connectionString,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
