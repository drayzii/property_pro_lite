import db from '../config/dbConn';
import userModel from '../model/userModel';
import propertyModel from '../model/propertyModel';

class schema {
  static async createUser(data) {
    await userModel();
    const query = `INSERT INTO users(
                  email,
                  firstname,
                  lastname,
                  password,
                  phoneNumber,
                  address)
                  VALUES ($1,$2,$3,$4,$5,$6)
                  RETURNING id, email, firstname`;
    try {
      const { rows } = await db.query(query, data);
      const user = rows[0];
      return user;
    } catch (error) {
      return 0;
    }
  }

  static async getUser(data) {
    await userModel();
    const query = `SELECT * FROM users WHERE 
                    email = $1`;
    try {
      const { rows } = await db.query(query, data);
      const user = rows[0];
      return user;
    } catch (error) {
      return 0;
    }
  }

  static async getUserByID(data) {
    await userModel();
    const query = `SELECT * FROM users WHERE 
                    id = $1`;
    try {
      const { rows } = await db.query(query, data);
      const user = rows[0];
      return user;
    } catch (error) {
      return 0;
    }
  }

  static async addProperty(data, image) {
    await propertyModel();
    let query;
    if (image) {
      query = `INSERT INTO properties(
                  owner,
                  price,
                  state,
                  city,
                  address,
                  type,
                  image_url)
                  VALUES ($1,$2,$3,$4,$5,$6,$7)
                  RETURNING *`;
    } else {
      query = `INSERT INTO properties(
                  owner,
                  price,
                  state,
                  city,
                  address,
                  type)
                  VALUES ($1,$2,$3,$4,$5,$6)
                  RETURNING *`;
    }
    try {
      const { rows } = await db.query(query, data);
      const property = rows[0];
      return property;
    } catch (error) {
      return 0;
    }
  }

  static async getProperty(data, isAdmin) {
    await propertyModel();
    let query;
    if (isAdmin) {
      query = `SELECT * FROM properties WHERE 
                    id = $1`;
    } else {
      query = `SELECT * FROM properties WHERE 
                    id = $1 AND status = 'Available'`;
    }
    try {
      const { rows } = await db.query(query, data);
      const property = rows[0];
      return property;
    } catch (error) {
      return 0;
    }
  }

  static async getAllProperties() {
    await propertyModel();
    const query = 'SELECT * FROM properties';
    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      return 0;
    }
  }

  static async getPropertiesByType(data) {
    await propertyModel();
    const query = `SELECT * FROM properties WHERE 
                    type = $1`;
    try {
      const { rows } = await db.query(query, data);
      return rows;
    } catch (error) {
      return 0;
    }
  }

  static async updateProperty(data, image) {
    await propertyModel();
    let query;
    if (image) {
      query = `UPDATE properties SET
                  price = $1,
                  state = $2,
                  city = $3,
                  address = $4,
                  type = $5,
                  image_url = $6
                  WHERE id = $7
                  RETURNING *`;
    } else {
      query = `UPDATE properties SET
                  price = $1,
                  state = $2,
                  city = $3,
                  address = $4,
                  type = $5
                  WHERE id = $6
                  RETURNING *`;
    }
    try {
      const { rows } = await db.query(query, data);
      const property = rows[0];
      return property;
    } catch (error) {
      return 0;
    }
  }

  static async markAsSold(data) {
    await propertyModel();
    const query = `UPDATE properties SET
                  status = 'Sold'
                  WHERE id = $1
                  RETURNING *`;
    try {
      const { rows } = await db.query(query, data);
      const property = rows[0];
      return property;
    } catch (error) {
      return 0;
    }
  }

  static async flag(data) {
    await propertyModel();
    const query = `UPDATE properties SET
                  status = 'Flagged'
                  WHERE id = $1
                  RETURNING *`;
    try {
      const { rows } = await db.query(query, data);
      const property = rows[0];
      return property;
    } catch (error) {
      return 0;
    }
  }

  static async deleteProperty(data) {
    await propertyModel();
    const query = `DELETE FROM properties WHERE 
                    id = $1
                    RETURNING *`;
    try {
      const { rows } = await db.query(query, data);
      const property = rows[0];
      return property;
    } catch (error) {
      return 0;
    }
  }
}

export default schema;
