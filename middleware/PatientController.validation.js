/* eslint-disable max-len */
const Joi = require('joi');

const validateParms = {
  searchForPatient: (obj) => {
    const JoiSchema = Joi.object({
      name: Joi.string().min(2).max(150),
    });

    return JoiSchema.validate({ firstname, lastname } = obj);
  },

  id: (obj) => {
    const JoiSchema = Joi.object({
      id: Joi.string().min(35).max(36).required(),
    });

    return JoiSchema.validate({
      id
    } = obj);
  },
};

module.exports = validateParms;
