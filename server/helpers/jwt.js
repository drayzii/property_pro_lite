import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class jwt {
  static async makeToken(id) {
    const token = jsonwebtoken.sign({ id }, process.env.JWT_KEY);
    return token;
  }
}

export default jwt;
