/* eslint-disable max-len */
const Joi = require('joi');

const validateParms = {
  createLabReportPatient: (obj) => {
    const JoiSchema = Joi.object({
      patientId: Joi.string().min(10).max(37).required(),
      testName: Joi.string().min(2).max(250).required(),
      isActive: Joi.string().valid('true').valid('false').optional(),
      testValue: Joi.string().min(2).max(150).required(),
      minValue: Joi.string().min(2).max(150),
      maxValue: Joi.string().min(2).max(50),
      calUnit: Joi.string().min(2).max(150),
      comment: Joi.string().min(2).max(300),
    });
    return JoiSchema.validate({ email, password, firstName, lastName, dateOfBirth, gender, phoneNumber, height, weight, bloodGroup, genotype } = obj);
  },
};

module.exports = validateParms;
