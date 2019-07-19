import bcrypt from '../helpers/bcrypt';
import jwt from '../helpers/jwt';
import schemas from '../schema/schema';
import response from '../helpers/responses';

class user {
  static async signUp(req, res) {
    const {
      email, firstName, lastName, password, phoneNumber, address,
    } = req.body;
    const userInfo = await schemas.getUser([email]);
    if (!userInfo) {
      const encryptedPassword = await bcrypt.encryptPassword(password);
      if (!encryptedPassword) {
        response.error(res, 500, 'Could not encrypt password');
      } else {
        const newUser = await schemas.createUser([
          email,
          firstName,
          lastName,
          encryptedPassword,
          phoneNumber,
          address,
        ]);
        if (newUser) {
          const data = {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstname,
            lastName: newUser.lastname,
          };
          const token = await jwt.makeToken(data);
          response.success(res, 201, {
            token,
          });
        } else {
          response.error(res, 500, 'Could not create user');
        }
      }
    } else {
      response.error(res, 409, 'Email already exists in our database');
    }
  }
  static async signIn(req, res) {
    const {
      email, password,
    } = req.body;
    const userInfo = await schemas.getUser([email]);
    if (!userInfo) {
      response.error(res, 401, 'Email not found');
    } else {
      const truePassword = await bcrypt.checkPassword(password, userInfo.password);
      if (truePassword) {
        const data = {
          id: userInfo.id,
          email: userInfo.email,
          firstName: userInfo.firstname,
          lastName: userInfo.lastname,
        };
        const token = await jwt.makeToken(data);
        response.success(res, 200, {
          token,
        });
      } else {
        response.error(res, 401, 'Wrong Password');
      }
    }
  }
}

export default user;
