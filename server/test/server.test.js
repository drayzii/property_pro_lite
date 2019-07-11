import chai from 'chai';
import chaiHttp from 'chai-http';
import { readFileSync as readFile } from 'fs';
import jsonwebtoken from 'jsonwebtoken';

import jwtKey from '../config/keys';
import app from '../app';

const should = chai.should();

chai.use(chaiHttp);

let token;

describe('/Authentication', () => {
  describe('/Sign Up', () => {
    it('should create a new user', (done) => {
      const user = {
        email: 'jonathan@gmail.com',
        firstname: 'Jonathan',
        lastname: 'Shyaka',
        password: 'native',
        phoneNumber: '0780888888',
        address: 'KN 3 RD',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(200);
          return done();
        });
    });
    it('should create a token', (done) => {
      const user = {
        email: 'jonathan@gmail.com',
        firstname: 'Jonathan',
        lastname: 'Shyaka',
        password: 'native',
        phoneNumber: '0780888888',
        address: 'KN 3 RD',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          should.exist(res.body.token);
          return done();
        });
    });
    it('should enter valid email', (done) => {
      const user = {
        email: 'jonathan',
        firstname: 'Jonathan',
        lastname: 'Shyaka',
        password: 'native',
        phoneNumber: '0780888888',
        address: 'KN 3 RD',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.error.should.equal('You have to enter a valid email');
          return done();
        });
    });
    it('should enter valid first name', (done) => {
      const user = {
        email: 'jonathan@gmail.com',
        firstname: '',
        lastname: 'Shyaka',
        password: 'native',
        phoneNumber: '0780888888',
        address: 'KN 3 RD',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.error.should.equal('You have to enter a valid name');
          return done();
        });
    });
    it('should enter valid last name', (done) => {
      const user = {
        email: 'jonathan@gmail.com',
        firstname: 'Jonathan',
        lastname: '',
        password: 'native',
        phoneNumber: '0780888888',
        address: 'KN 3 RD',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.error.should.equal('You have to enter a valid name');
          return done();
        });
    });
    it('should enter valid password', (done) => {
      const user = {
        email: 'jonathan@gmail.com',
        firstname: 'Jonathan',
        lastname: 'Shyaka',
        password: 'nat',
        phoneNumber: '0780888888',
        address: 'KN 3 RD',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.error.should.equal('You have to enter a valid password with 6 or more characters');
          return done();
        });
    });
    it('should enter valid phone number', (done) => {
      const user = {
        email: 'jonathan@gmail.com',
        firstname: 'Jonathan',
        lastname: 'Shyaka',
        password: 'native',
        phoneNumber: '0780',
        address: 'KN 3 RD',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.error.should.equal('You have to enter a valid phone number');
          return done();
        });
    });
    it('should enter valid address', (done) => {
      const user = {
        email: 'jonathan@gmail.com',
        firstname: 'Jonathan',
        lastname: 'Shyaka',
        password: 'native',
        phoneNumber: '0780888888',
        address: '',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.error.should.equal('You have to enter a valid address');
          return done();
        });
    });
  });
  describe('/Sign In', () => {
    it('should sign in a user', (done) => {
      const user = {
        email: 'jonathan@gmail.com',
        password: 'native',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(200);
          return done();
        });
    });
    it('should enter the right email', (done) => {
      const user = {
        email: 'shyaka@gmail.com',
        password: 'native',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.error.should.equal('User not found');
          return done();
        });
    });
    it('should enter the right password', (done) => {
      const user = {
        email: 'jonathan@gmail.com',
        password: 'vetina',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.error.should.equal('Wrong Password');
          return done();
        });
    });
    it('should create a token', (done) => {
      const user = {
        email: 'jonathan@gmail.com',
        password: 'native',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          should.exist(res.body.token);
          return done();
        });
    });
    it('should enter valid email', (done) => {
      const user = {
        email: 'jonathan',
        password: 'native',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.error.should.equal('You have to enter a valid email');
          return done();
        });
    });
    it('should enter valid password', (done) => {
      const user = {
        email: 'jonathan@gmail.com',
        password: 'nat',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.error.should.equal('You have to enter a valid password with 6 or more characters');
          return done();
        });
    });
  });
});
describe('/Property', () => {
  before('should generate token', (done) => {
    token = jsonwebtoken.sign({ email: 'jonathan@gmail.com' }, jwtKey);
    done();
  });
  it('should add a new property', (done) => {
    const property = {
      type: 'flat',
      state: 'Kigali',
      city: 'Kigali',
      address: 'KN3RD',
      price: 50000000,
    };
    chai.request(app)
      .post('/api/v1/property')
      .set('authorization', `Bearer ${token}`)
      .send(property)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(200);
        return done();
      });
  });
});
