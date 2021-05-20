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
        specialty: Joi.string().min(2).max(150).valid('doctor').valid('nurse').valid('lab technician').valid('radiologist'),
        gender: Joi.string().min(2).max(50),
        phoneNumber: Joi.string().min(2).max(150),
        address: Joi.string().min(2).max(150),
    });

    return JoiSchema.validate({
      email, password, firstname, lastName, dateOfBirth, gender, phoneNumber, address, specialty
    } = obj);
  },

  createPrescription: (obj) => {
    const JoiSchema = Joi.object({
        drugName: Joi.string().required(),
        dosage: Joi.string().min(2).max(150).required(),
        drugType: Joi.string().min(2).max(150).required(),
        startDate: Joi.string().min(2).max(150).required(),
        period: Joi.string().min(2).max(150).required(),
        patientId: Joi.string().required(),
        note: Joi.string().optional(),
    });

    return JoiSchema.validate({
      drugName, dosage, drugType, startDate, period, note,  patientId
    } = obj);
  },

  createTimeline: (obj) => {
    const JoiSchema = Joi.object({
        title: Joi.string().required(),
        date: Joi.string().min(2).max(150).required(),
        description: Joi.string(),
        patientId: Joi.string().required()
    });

    return JoiSchema.validate({
      title, date, description, patientId
    } = obj);
  },

  validateSpecialty: (obj)=>{
    const JoiSchema = Joi.object({
      specialty: Joi.string().min(2).max(150).valid('doctor').valid('nurse').valid('lab technician').valid('radiologist'),
  });

  return JoiSchema.validate({
    specialty
  } = obj);
  }
};

module.exports = validateParms;
