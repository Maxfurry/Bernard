const Joi = require('joi');

const validateParms = {

    id: (obj) => {
        const JoiSchema = Joi.object({
            id: Joi.string().min(35).max(36).required(),
        });

        return JoiSchema.validate({
            id
        } = obj);
    },

    paginationQuery: (obj) => {
        const JoiSchema = Joi.object({
            start: Joi.number().min(0).required(),
            count: Joi.number().min(1).required()
        });

        return JoiSchema.validate({
            start, count
        } = obj);
    },
};

module.exports = {
    idValidation: validateParms.id,
    paginationQuery: validateParms.paginationQuery
};