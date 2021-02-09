/* eslint-disable max-len */
const Joi = require('joi');

const validateParms = {
  createLabReportPatient: (obj) => {
    const JoiSchema = Joi.object({
      patientId: Joi.string().min(10).max(37).required(),
      admissionId: Joi.string().min(10).max(37).required(),
      testName: Joi.string().min(2).max(250).required(),
      result: Joi.string().min(2).max(250).required(),
      testValue: Joi.string().min(2).max(150).required(),
      comment: Joi.string().min(2).max(300),
    });
    return JoiSchema.validate({ patientId, admissionId, testName, testValue, comment } = obj);
  },
};

module.exports = validateParms;
