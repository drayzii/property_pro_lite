import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import jwtKey from '../config/keys';

import User from '../model/userModel';


class user {
  static signUp(req, res) {
    const id = User.length + 1;
    const {
      email, firstname, lastname, password, phoneNumber, address,
    } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.json({
          status: 'failed',
          error: err,
        });
      } else {
        const newUser = {
          id,
          email,
          firstname,
          lastname,
          password: hash,
          phoneNumber,
          address,
          isAdmin: false,
        };
        User[id - 1] = newUser;

        const jwtExpiry = 3600;

        const token = jsonwebtoken.sign({ email }, jwtKey);

        res.cookie('token', token, { maxAge: jwtExpiry * 1000 });

        res.json({
          status: 'success',
          token,
          data: newUser,
        });
      }
    });
  }
}

export default user;
