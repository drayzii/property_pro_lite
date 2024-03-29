import chai from 'chai';
import chaiHttp from 'chai-http';
import userTable from '../model/userModel';
import propertyTable from '../model/propertyModel';

import app from '../app';

const should = chai.should();

chai.use(chaiHttp);

let theToken;
let newToken;
before('Create tables', (done) => {
  userTable();
  propertyTable();
  done();
});
describe('/Homepage', () => {
  it('should return a welcome message', (done) => {
    chai.request(app)
      .get('/')
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(200);
        return done();
      });
  });
});
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
      price: '50000000',
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
    before('should create a new user', (done) => {
      const user = {
        email: 'jonathan@gmail.com',
        firstName: 'Jonathan',
        lastName: 'Shyaka',
        password: 'native',
        phoneNumber: '0780888888',
        address: 'KN 8 RD',
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
        firstName: 'Jonathan',
        lastName: 'Shyaka',
        password: 'native',
        phoneNumber: '0780888888',
        address: 'KN 9 RD',
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
        firstName: 'Jonathan',
        lastName: 'Shyaka',
        password: 'native',
        phoneNumber: '0780888888',
        address: 'KN 10 RD',
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
        firstName: '',
        lastName: 'Shyaka',
        password: 'native',
        phoneNumber: '0780888888',
        address: 'KN 11 RD',
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
        firstName: 'Jonathan',
        lastName: '',
        password: 'native',
        phoneNumber: '0780888888',
        address: 'KN 12 RD',
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
        firstName: 'Jonathan',
        lastName: 'Shyaka',
        password: 'nat',
        phoneNumber: '0780888888',
        address: 'KN 13 RD',
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
        firstName: 'Jonathan',
        lastName: 'Shyaka',
        password: 'native',
        phoneNumber: '0780',
        address: 'KN 14 RD',
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
        firstName: 'Jonathan',
        lastName: 'Shyaka',
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
describe('/No token', () => {
  it('should return 403', (done) => {
    chai.request(app)
      .get('/api/v1/property')
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
describe('/Invalid token', () => {
  it('should return 403', (done) => {
    chai.request(app)
      .get('/api/v1/property')
      .set('authorization', 'Bearer girhgiotgjtieiogjietgivudgheuihuergi')
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
describe('/View All Properties', () => {
  it('should return 404 if none', (done) => {
    chai.request(app)
      .get('/api/v1/property')
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
describe('/Property', () => {
  describe('/Add', () => {
    before('should add a new property', (done) => {
      const property = {
        type: 'flat',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN 15 RD',
        price: '50000000',
      };
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${theToken}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(201);
          return done();
        });
    });
    it('should enter valid type', (done) => {
      const property = {
        type: '',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN 3 RD',
        price: '50000000',
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
        price: '50000000',
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
        price: '50000000',
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
        price: '50000000',
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
  before('should create a new user', (done) => {
    const user = {
      email: 'jonathan2@gmail.com',
      firstName: 'Jonathan',
      lastName: 'Shyaka',
      password: 'native',
      phoneNumber: '0780888888',
      address: 'KN 1 RD',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        newToken = res.body.data.token;
        res.body.status.should.equal(201);
        return done();
      });
  });
  describe('/Update', () => {
    it('should be owner to update property', (done) => {
      const property = {
        type: 'miniflat',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN3RD',
        price: '50000000',
      };
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${newToken}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(403);
          return done();
        });
    });
    it('should update property', (done) => {
      const property = {
        type: 'miniflat',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN3RD',
        price: '50000000',
      };
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${theToken}`)
        .send(property)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(202);
          return done();
        });
    });
    it('should be available', (done) => {
      const property = {
        type: 'flat',
        state: 'Kigali',
        city: 'Kigali',
        address: 'KN 2 RD',
        price: '50000000',
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
        address: 'KN 4 RD',
        price: '50000000',
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
        price: '50000000',
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
        price: '50000000',
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
        price: '50000000',
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
  describe('/View All', () => {
    it('should fetch all properties', (done) => {
      chai.request(app)
        .get('/api/v1/property')
        .set('authorization', `Bearer ${theToken}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(200);
          return done();
        });
    });
  });
  describe('/View By Type', () => {
    it('should fetch all properties by type', (done) => {
      chai.request(app)
        .get('/api/v1/property?type=miniflat')
        .set('authorization', `Bearer ${theToken}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(200);
          return done();
        });
    });
  });
  describe('/View By Status', () => {
    it('should fetch all properties by status', (done) => {
      chai.request(app)
        .get('/api/v1/property?status=Available')
        .set('authorization', `Bearer ${theToken}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(200);
          return done();
        });
    });
  });
  describe('/View One', () => {
    it('should fetch the property', (done) => {
      chai.request(app)
        .get('/api/v1/property/1')
        .set('authorization', `Bearer ${theToken}`)
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
    it('should be owner to mark property as sold', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .set('authorization', `Bearer ${newToken}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(403);
          return done();
        });
    });
    it('should mark property as sold', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .set('authorization', `Bearer ${theToken}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(202);
          return done();
        });
    });
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
  before('should add a new property', (done) => {
    const property = {
      type: 'miniflat',
      state: 'Kigali',
      city: 'Kigali',
      address: 'KN 5 RD',
      price: '50000000',
    };
    chai.request(app)
      .post('/api/v1/property')
      .set('authorization', `Bearer ${theToken}`)
      .send(property)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(201);
        return done();
      });
  });
  describe('/Mark as sold', () => {
    it('should flag a property', (done) => {
      chai.request(app)
        .patch('/api/v1/property/2/flag')
        .set('authorization', `Bearer ${theToken}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(202);
          return done();
        });
    });
    it('should be available', (done) => {
      chai.request(app)
        .patch('/api/v1/property/300/flag')
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
  before('should add a new property', (done) => {
    const property = {
      type: 'threeroom',
      state: 'Kigali',
      city: 'Kigali',
      address: 'KN 6 RD',
      price: '50000000',
    };
    chai.request(app)
      .post('/api/v1/property')
      .set('authorization', `Bearer ${theToken}`)
      .send(property)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(201);
        return done();
      });
  });
  describe('/Delete', () => {
    it('should be the owner to delete the property', (done) => {
      chai.request(app)
        .delete('/api/v1/property/3')
        .set('authorization', `Bearer ${newToken}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(403);
          return done();
        });
    });
    it('should delete the property', (done) => {
      chai.request(app)
        .delete('/api/v1/property/3')
        .set('authorization', `Bearer ${theToken}`)
        .send()
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(202);
          return done();
        });
    });
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
describe('/View All Properties by Type', () => {
  it('should return 404 if none', (done) => {
    chai.request(app)
      .get('/api/v1/property?type=miniflat')
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
describe('/View All Properties by Status', () => {
  it('should return 404 if none', (done) => {
    chai.request(app)
      .get('/api/v1/property?status=qwerty')
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
describe('/Token', () => {
  it('should have a valid token to access properties route', (done) => {
    const property = {
      type: 'flat',
      state: 'Kigali',
      city: 'Kigali',
      address: 'KN3RD',
      price: '50000000',
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
