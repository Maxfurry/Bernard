/* eslint-disable max-len */
const Joi = require('joi');

const validateParms = {
  registerPatient: (obj) => {
    const JoiSchema = Joi.object({
      email: Joi.string().email().max(150),
      password: Joi.string().min(2).max(150),
      firstName: Joi.string().min(2).max(150),
      lastName: Joi.string().min(2).max(150),
      dateOfBirth: Joi.string().min(2).max(150),
      gender: Joi.string().min(2).max(50),
      phoneNumber: Joi.string().min(2).max(150),
      height: Joi.string().min(2).max(10),
      weight: Joi.string().min(2).max(10),
      bloodGroup: Joi.string().min(1).max(10),
      genotype: Joi.string().min(2).max(10),
      occupation: Joi.string().min(2).required(),
      address: Joi.string(),
    });
    return JoiSchema.validate({ email, address, password, firstName, lastName, dateOfBirth, gender, phoneNumber, height, weight, bloodGroup, genotype, occupation } = obj);
  },
  searchForPatient: (obj) => {
    const JoiSchema = Joi.object({
      name: Joi.string().min(2).max(150),
    });

    return JoiSchema.validate({ firstname, lastname } = obj);
  },
};

module.exports = validateParms;
