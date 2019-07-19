import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import schema from '../schema/schema';
import response from '../helpers/responses';

dotenv.config();

const verify = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    try {
      const payload = await jsonwebtoken.verify(token, process.env.JWT_KEY);
      req.user = payload;
      if (req.user.id) {
        const userInfo = await schema.getUserByID([req.user.id]);
        req.user.isAdmin = userInfo.isAdmin;
        next();
      } else {
        response.error(res, 403, 'Forbidden route');
      }
    } catch (error) {
      response.error(res, 403, 'Forbidden route');
    }
  } else {
    response.error(res, 403, 'Forbidden route');
  }
};

export default verify;
