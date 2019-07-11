import Joi from '@hapi/joi';

class validation {
  static userValidation(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }).required()
        .error(() => 'You have to enter a valid email'),
      firstname: Joi.string().alphanum().min(3).max(30).required()
        .error(() => 'You have to enter a valid name'),
      lastname: Joi.string().alphanum().min(3).max(30).required()
        .error(() => 'You have to enter a valid name'),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        .error(() => 'You have to enter a valid password with 6 or more characters'),
      phoneNumber: Joi.string().regex(/^[0-9+-]{10,18}$/).required()
        .error(() => 'You have to enter a valid phone number'),
      address: Joi.string().required()
        .error(() => 'You have to enter a valid address'),
    });
    schema.validate(req.body, (err) => {
      if (err) {
        res.status(422).json({
          status: 422,
          error: err.details[0].message,
        });
      } else {
        next();
      }
    });
  }
  static emailValidation(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }).required()
        .error(() => 'You have to enter a valid email'),
    });
    schema.validate({ email: req.body.email }, (err) => {
      if (err) {
        res.json({
          status: 422,
          error: err.details[0].message,
        });
      } else {
        next();
      }
    });
  }
  static passwordValidation(req, res, next) {
    const schema = Joi.object().keys({
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        .error(() => 'You have to enter a valid password with 6 or more characters'),
    });
    schema.validate({ password: req.body.password }, (err) => {
      if (err) {
        res.json({
          status: 422,
          error: err.details[0].message,
        });
      } else {
        next();
      }
    });
  }
  static propertyValidation(req, res, next) {
    const schema = Joi.object().keys({
      type: Joi.string().alphanum().min(3).max(30).required()
        .error(() => 'You have to enter a valid type'),
      state: Joi.string().alphanum().min(3).max(30).required()
        .error(() => 'You have to enter a valid state'),
      city: Joi.string().alphanum().min(3).max(30).required()
        .error(() => 'You have to enter a valid city'),
      address: Joi.string().alphanum().min(3).max(30).required()
        .error(() => 'You have to enter a valid address'),
      price: Joi.number().integer().required()
        .error(() => 'The price has to be a valid number'),
    });
    schema.validate(req.body, (err) => {
      if (err) {
        res.json({
          status: 422,
          error: err.details[0].message,
        });
      } else {
        next();
      }
    });
  }
}

export default validation;
