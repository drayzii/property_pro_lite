import '@babel/polyfill';
import db from '../config/dbConn';

const makeUserTable = async () => {
  const createTable = `CREATE TABLE IF NOT EXISTS users(
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(250) not null,
                    firstname VARCHAR(250) not null,
                    lastname VARCHAR(250) not null,
                    password VARCHAR(250) not null,
                    phoneNumber VARCHAR(250) not null,
                    address VARCHAR(250) not null,
                    isAdmin BOOLEAN DEFAULT false)`;

  const tableCreated = await db.query(createTable, (err, result) => result);
  return tableCreated;
};
export default makeUserTable;
