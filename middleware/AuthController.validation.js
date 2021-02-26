/* eslint-disable max-len */
const Joi = require('joi');

const validateParms = {
  login: (obj) => {
    const JoiSchema = Joi.object({
      email: Joi.string().email().max(150),
      password: Joi.string().min(2).max(150),
    });
    return JoiSchema.validate({ email, password } = obj);
  }
};

module.exports = validateParms;
