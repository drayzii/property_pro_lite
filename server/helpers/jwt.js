import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class jwt {
  static async makeToken(data) {
    const token = jsonwebtoken.sign(data, process.env.JWT_KEY);
    return token;
  }
}

export default jwt;
