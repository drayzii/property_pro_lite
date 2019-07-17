import db from '../config/dbConn';


const makePropertyTable = async () => {
  const createTable = `CREATE TABLE IF NOT EXISTS properties(
                            id SERIAL PRIMARY KEY,
                            owner INT not null,
                            status VARCHAR(250) DEFAULT 'Available',
                            price FLOAT(2) not null,
                            state VARCHAR(250) not null,
                            city VARCHAR(250) not null,
                            address VARCHAR(250) not null,
                            type VARCHAR(250) not null,
                            createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            image_url VARCHAR(250))`;
  const tableCreated = await db.query(createTable, (err, result) => result);
  return tableCreated;
};


export default makePropertyTable;
