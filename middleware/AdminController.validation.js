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
        speciality: Joi.string().min(2).max(150).valid('doctor').valid('nurse').valid('lab technician').valid('radiologist'),
        gender: Joi.string().min(2).max(50),
        phoneNumber: Joi.string().min(2).max(150),
        address: Joi.string().min(2).max(150),
    });

    return JoiSchema.validate({
      email, password, firstname, lastName, dateOfBirth, gender, phoneNumber, address
    } = obj);
  },
  validateSpeciality: (obj)=>{
    const JoiSchema = Joi.object({
      speciality: Joi.string().min(2).max(150).valid('doctor').valid('nurse').valid('lab technician').valid('radiologist'),
  });

  return JoiSchema.validate({
    speciality
  } = obj);
  }
};

module.exports = validateParms;
