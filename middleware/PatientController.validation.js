/* eslint-disable max-len */
const Joi = require('joi');

const validateParms = {
  searchForPatient: (obj) => {
    const JoiSchema = Joi.object({
      name: Joi.string().min(2).max(150),
    });

    return JoiSchema.validate({ firstname, lastname } = obj);
  },
};

module.exports = validateParms;
