import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../model/userModel';

dotenv.config();

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
          const isAdmin = false;
          const newUser = {
            id,
            email,
            firstname,
            lastname,
            password: hash,
            phoneNumber,
            address,
            isAdmin,
          };
          User.push(newUser);

          const token = jsonwebtoken.sign({ email }, process.env.JWT_KEY);

          res.status(201).json({
            status: 201,
            data: {
              token,
              id,
              email,
              firstname,
              lastname,
              phoneNumber,
              address,
              isAdmin,
            },
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
          const token = jsonwebtoken.sign({ email }, process.env.JWT_KEY);

          res.status(200).json({
            status: 200,
            data: {
              token,
              id: oneUser.id,
              email: oneUser.email,
              firstname: oneUser.firstname,
              lastname: oneUser.lastname,
              phoneNumber: oneUser.phoneNumber,
              address: oneUser.address,
              isAdmin: oneUser.isAdmin,
            },
          });
        } else {
          res.status(400).json({
            status: 400,
            error: 'Wrong Password',
          });
        }
      });
    }
  }
}

export default user;
