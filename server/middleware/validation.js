import Joi from '@hapi/joi';

class validation {
  static userValidation(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }).required()
        .error(() => 'You have to enter a valid email. Example: yourname@domain.com'),
      firstname: Joi.string().alphanum().min(3).max(30).required()
        .error(() => 'You have to enter a valid name. Example: Jane'),
      lastname: Joi.string().alphanum().min(3).max(30).required()
        .error(() => 'You have to enter a valid name. Example: Doe'),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        .error(() => 'You have to enter a valid password with more than 6 characters. Example: andela'),
      phoneNumber: Joi.string().regex(/^[0-9+-]{10,18}$/).required()
        .error(() => 'You have to enter a valid phone number. Example: +250788888888'),
      address: Joi.string().required()
        .error(() => 'You have to enter a valid address. Example: KN 3 RD'),
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
        .error(() => 'You have to enter a valid email. Example: yourname@domain.com'),
    });
    schema.validate({ email: req.body.email }, (err) => {
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
  static passwordValidation(req, res, next) {
    const schema = Joi.object().keys({
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        .error(() => 'You have to enter a valid password with 6 or more characters'),
    });
    schema.validate({ password: req.body.password }, (err) => {
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
  static propertyValidation(req, res, next) {
    const schema = Joi.object().keys({
      type: Joi.string().min(3).max(30).required()
        .error(() => 'You have to enter a valid type. Example: flat, mini-flat'),
      state: Joi.string().alphanum().min(3).max(30).required()
        .error(() => 'You have to enter a valid state. Example: Kigali'),
      city: Joi.string().alphanum().min(3).max(30).required()
        .error(() => 'You have to enter a valid city. Example: Kigali'),
      address: Joi.string().min(3).max(30).required()
        .error(() => 'You have to enter a valid address. Example: KN 3 RD'),
      price: Joi.number().integer().required()
        .error(() => 'The price has to be a valid number. Example: 50000000'),
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
  static updateValidation(req, res, next) {
    const schema = Joi.object().keys({
      type: Joi.string().min(3).max(30).optional()
        .error(() => 'You have to enter a valid type. Example: flat, mini-flat'),
      state: Joi.string().alphanum().min(3).max(30).optional()
        .error(() => 'You have to enter a valid state. Example: Kigali'),
      city: Joi.string().alphanum().min(3).max(30).optional()
        .error(() => 'You have to enter a valid city. Example: Kigali'),
      address: Joi.string().min(3).max(30).optional()
        .error(() => 'You have to enter a valid address. Example: KN 3 RD'),
      price: Joi.number().integer().optional()
        .error(() => 'The price has to be a valid number. Example: 50000000'),
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
}

export default validation;
