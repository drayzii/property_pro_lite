import chai from 'chai';
import chaiHttp from 'chai-http';
import { readFileSync as readFile } from 'fs';
import jsonwebtoken from 'jsonwebtoken';

import jwtKey from '../config/keys';
import app from '../app';

const should = chai.should();

chai.use(chaiHttp);

let token;
describe('/Unknown route', () => {
  it('should return not found', (done) => {
    chai.request(app)
      .get('/jonathan')
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(404);
        return done();
      });
  });
});
describe('/No token', () => {
  it('should have a token to access route', (done) => {
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
        res.body.status.should.equal(403);
        return done();
      });
  });
});
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
          res.body.status.should.equal(201);
          return done();
        });
    });
    it('should create a token', (done) => {
      const user = {
        email: 'jonathan2@gmail.com',
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
          should.exist(res.body.data.token);
          return done();
        });
    });
    it('should not reuse the same email', (done) => {
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
          res.body.status.should.equal(401);
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
          res.body.status.should.equal(422);
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
          res.body.status.should.equal(422);
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
          res.body.status.should.equal(422);
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
          res.body.status.should.equal(422);
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
          res.body.status.should.equal(422);
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
          res.body.status.should.equal(422);
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
          res.body.status.should.equal(404);
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
          res.body.status.should.equal(400);
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
          should.exist(res.body.data.token);
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
          res.body.status.should.equal(422);
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
          res.body.status.should.equal(422);
          return done();
        });
    });
  });
});
describe('/Property', () => {
  describe('/Add', () => {
    beforeEach('should generate token', (done) => {
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
          res.body.status.should.equal(201);
          return done();
        });
    });
    it('should have a valid token', (done) => {
      const property = {
        type: 'flat',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN3RD',
        price: 50000000,
      };
      token += 'a';
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${token}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(403);
          return done();
        });
    });
    it('should enter valid type', (done) => {
      const property = {
        type: '',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN 3 RD',
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
          res.body.status.should.equal(422);
          return done();
        });
    });
    it('should enter valid state', (done) => {
      const property = {
        type: 'flat',
        state: '',
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
          res.body.status.should.equal(422);
          return done();
        });
    });
    it('should enter valid city', (done) => {
      const property = {
        type: 'flat',
        state: 'Kigali',
        city: '',
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
          res.body.status.should.equal(422);
          return done();
        });
    });
    it('should enter valid address', (done) => {
      const property = {
        type: 'flat',
        state: 'Kigali',
        city: 'Kigali',
        address: '',
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
          res.body.status.should.equal(422);
          return done();
        });
    });
    it('should enter valid price', (done) => {
      const property = {
        type: 'flat',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN3RD',
        price: 'a',
      };
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${token}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(422);
          return done();
        });
    });
  });
  describe('/Update', () => {
    beforeEach('should generate token', (done) => {
      token = jsonwebtoken.sign({ email: 'jonathan@gmail.com' }, jwtKey);
      done();
    });
    it('should update property', (done) => {
      const property = {
        type: 'miniflat',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN3RD',
        price: 50000000,
      };
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${token}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(202);
          return done();
        });
    });
    it('should have a valid token', (done) => {
      const property = {
        type: 'miniflat',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN3RD',
        price: 50000000,
      };
      token += 'a';
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${token}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(403);
          return done();
        });
    });
    it('should be available', (done) => {
      const property = {
        type: 'flat',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN 3 RD',
        price: 50000000,
      };
      chai.request(app)
        .patch('/api/v1/property/200')
        .set('authorization', `Bearer ${token}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(404);
          return done();
        });
    });
    it('should enter valid type', (done) => {
      const property = {
        type: '',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN 3 RD',
        price: 50000000,
      };
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${token}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(422);
          return done();
        });
    });
    it('should enter valid state', (done) => {
      const property = {
        type: 'flat',
        state: '',
        city: 'Kigali',
        address: 'KN3RD',
        price: 50000000,
      };
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${token}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(422);
          return done();
        });
    });
    it('should enter valid city', (done) => {
      const property = {
        type: 'flat',
        state: 'Kigali',
        city: '',
        address: 'KN3RD',
        price: 50000000,
      };
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${token}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(422);
          return done();
        });
    });
    it('should enter valid address', (done) => {
      const property = {
        type: 'flat',
        state: 'Kigali',
        city: 'Kigali',
        address: '',
        price: 50000000,
      };
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${token}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(422);
          return done();
        });
    });
    it('should enter valid price', (done) => {
      const property = {
        type: 'flat',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN3RD',
        price: 'a',
      };
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${token}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(422);
          return done();
        });
    });
  });
  describe('/View All', () => {
    beforeEach('should generate token', (done) => {
      token = jsonwebtoken.sign({ email: 'jonathan@gmail.com' }, jwtKey);
      done();
    });
    it('should fetch all properties', (done) => {
      chai.request(app)
        .get('/api/v1/property')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(200);
          return done();
        });
    });
    it('should have a valid token', (done) => {
      token += 'a';
      chai.request(app)
        .get('/api/v1/property')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(403);
          return done();
        });
    });
  });
  describe('/View By Type', () => {
    beforeEach('should generate token', (done) => {
      token = jsonwebtoken.sign({ email: 'jonathan@gmail.com' }, jwtKey);
      done();
    });
    it('should fetch all properties', (done) => {
      chai.request(app)
        .get('/api/v1/property?type=miniflat')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(200);
          return done();
        });
    });
    it('should be available', (done) => {
      chai.request(app)
        .get('/api/v1/property?type=flat')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(404);
          return done();
        });
    });
  });
  describe('/View One', () => {
    beforeEach('should generate token', (done) => {
      token = jsonwebtoken.sign({ email: 'jonathan@gmail.com' }, jwtKey);
      done();
    });
    it('should fetch the property', (done) => {
      chai.request(app)
        .get('/api/v1/property/1')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(200);
          return done();
        });
    });
    it('should have a valid token', (done) => {
      token += 'a';
      chai.request(app)
        .get('/api/v1/property/1')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(403);
          return done();
        });
    });
    it('should be available', (done) => {
      chai.request(app)
        .get('/api/v1/property/300')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(404);
          return done();
        });
    });
  });
  describe('/Mark as sold', () => {
    beforeEach('should generate token', (done) => {
      token = jsonwebtoken.sign({ email: 'jonathan@gmail.com' }, jwtKey);
      done();
    });
    it('should fetch the property', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(202);
          return done();
        });
    });
    it('should have a valid token', (done) => {
      token += 'a';
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(403);
          return done();
        });
    });
    it('should be available', (done) => {
      chai.request(app)
        .patch('/api/v1/property/300/sold')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(404);
          return done();
        });
    });
  });
  describe('/Delete', () => {
    beforeEach('should generate token', (done) => {
      token = jsonwebtoken.sign({ email: 'jonathan@gmail.com' }, jwtKey);
      done();
    });
    it('should delete the property', (done) => {
      chai.request(app)
        .delete('/api/v1/property/1')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(202);
          return done();
        });
    });
    it('should have a valid token', (done) => {
      token += 'a';
      chai.request(app)
        .delete('/api/v1/property/1')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(403);
          return done();
        });
    });
    it('should be available', (done) => {
      chai.request(app)
        .delete('/api/v1/property/300')
        .set('authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(404);
          return done();
        });
    });
  });
});