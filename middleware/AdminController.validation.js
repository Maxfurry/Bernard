/* eslint-disable max-len */
const Joi = require('joi');

const validateParms = {
  createEmployee: (obj) => {
    const JoiSchema = Joi.object({
        email: Joi.string().email().max(150),
        password: Joi.string().min(2).max(150),
        firstname: Joi.string().min(2).max(150),
        lastname: Joi.string().min(2).max(150),
        dateOfBirth: Joi.string().min(2).max(150),
        role: Joi.string().min(2).max(150),
        gender: Joi.string().min(2).max(50),
        phoneNumber: Joi.string().min(2).max(150),
        address: Joi.string().min(2).max(150),
    });

    return JoiSchema.validate({
      email, password, firstname, lastName, dateOfBirth, gender, phoneNumber, address
    } = obj);
  },
};

module.exports = validateParms;
