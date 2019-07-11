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
    const oneUser = User.find(theuser => theuser.email === email);
    if (oneUser) {
      res.status(401).json({
        status: 401,
        error: 'Email already exists',
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({
            status: 500,
            error: 'Could not encrypt password',
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
  
          const token = jsonwebtoken.sign({ email }, jwtKey);
  
          res.status(201).json({
            status: 201,
            token,
            data: newUser,
          });
        }
      });
    }
  }
  static signIn(req, res) {
    const {
      email, password,
    } = req.body;
    const oneUser = User.find(theuser => theuser.email === email);
    if (!oneUser) {
      res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    } else {
      bcrypt.compare(password, oneUser.password, (err, result) => {
        if (err) {
          res.status(500).json({
            status: 500,
            error: 'Error decrypting Password',
          });
        }
        if (result) {
          const token = jsonwebtoken.sign({ email }, jwtKey);

          res.status(200).json({
            status: 200,
            token,
            data: oneUser,
          });
        }
      });
    }
  }
}

export default user;
