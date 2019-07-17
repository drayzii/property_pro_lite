import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

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
        next();
      } else {
        res.status(500).json({
          status: 500,
          error: 'Error decrypting token',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Error decrypting token',
      });
    }
  } else {
    res.status(403).json({
      status: 403,
      error: 'Forbidden route',
    });
  }
};

export default verify;
