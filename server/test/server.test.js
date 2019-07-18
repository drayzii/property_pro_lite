import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

const should = chai.should();

chai.use(chaiHttp);

let theToken;
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
      .set('authorization', `Bearer ${theToken}`)
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
          res.body.status.should.equal(409);
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
          res.body.status.should.equal(401);
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
          res.body.status.should.equal(401);
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
          theToken = res.body.data.token;
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
        .set('authorization', `Bearer ${theToken}`)
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
        .set('authorization', `Bearer ${theToken}`)
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
        .set('authorization', `Bearer ${theToken}`)
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
        .set('authorization', `Bearer ${theToken}`)
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
        .set('authorization', `Bearer ${theToken}`)
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
        .set('authorization', `Bearer ${theToken}`)
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
        .set('authorization', `Bearer ${theToken}`)
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
        .set('authorization', `Bearer ${theToken}`)
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
        .set('authorization', `Bearer ${theToken}`)
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
        .set('authorization', `Bearer ${theToken}`)
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
        .set('authorization', `Bearer ${theToken}`)
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
  describe('/View One', () => {
    it('should be available', (done) => {
      chai.request(app)
        .get('/api/v1/property/300')
        .set('authorization', `Bearer ${theToken}`)
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
    it('should be available', (done) => {
      chai.request(app)
        .patch('/api/v1/property/300/sold')
        .set('authorization', `Bearer ${theToken}`)
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
    it('should be available', (done) => {
      chai.request(app)
        .delete('/api/v1/property/300')
        .set('authorization', `Bearer ${theToken}`)
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
describe('/Token', () => {
  it('should have a valid token to access properties route', (done) => {
    const property = {
      type: 'flat',
      state: 'Kigali',
      city: 'Kigali',
      address: 'KN3RD',
      price: 50000000,
    };
    theToken += 'a';
    chai.request(app)
      .post('/api/v1/property')
      .set('authorization', `Bearer ${theToken}`)
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
