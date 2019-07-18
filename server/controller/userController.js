import bcrypt from '../helpers/bcrypt';
import jwt from '../helpers/jwt';
import schemas from '../schema/schema';

class user {
  static async signUp(req, res) {
    const {
      email, firstname, lastname, password, phoneNumber, address,
    } = req.body;
    const userInfo = await schemas.getUser([email]);
    if (!userInfo) {
      const encryptedPassword = await bcrypt.encryptPassword(password);
      if (!encryptedPassword) {
        res.status(500).json({
          status: 500,
          error: 'Could not encrypt password',
        });
      } else {
        const newUser = await schemas.createUser([
          email,
          firstname,
          lastname,
          encryptedPassword,
          phoneNumber,
          address,
        ]);
        if (newUser) {
          const data = {
            id: newUser.id,
            email: newUser.email,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
          };
          const token = await jwt.makeToken(data);
          res.status(201).json({
            status: 201,
            data: {
              token,
            },
          });
        } else {
          res.status(500).json({
            status: 500,
            error: 'Could not create user',
          });
        }
      }
    } else {
      res.status(409).json({
        status: 409,
        error: 'Email already exists in our database',
      });
    }
  }
  static async signIn(req, res) {
    const {
      email, password,
    } = req.body;
    const userInfo = await schemas.getUser([email]);
    if (!userInfo) {
      res.status(401).json({
        status: 401,
        error: 'Email not found',
      });
    } else {
      const truePassword = await bcrypt.checkPassword(password, userInfo.password);
      if (truePassword) {
        const data = {
          id: userInfo.id,
          email: userInfo.email,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
        };
        const token = await jwt.makeToken(data);
        res.status(200).json({
          status: 200,
          data: {
            token,
          },
        });
      } else {
        res.status(401).json({
          status: 401,
          error: 'Wrong Password',
        });
      }
    }
  }
}

export default user;
