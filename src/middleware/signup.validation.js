import Joi from 'joi';

const validatePatientSignup = obj =>{
    const JoiSchema = Joi.object({
        first_name: Joi.string().min(2).required(),
        middle_name: Joi.string().min(2).required(),
        last_name : Joi.string().min(2).required(),
        age: Joi.number().min(1).required(),
        gender: Joi.string().min(2).valid('male').valid('female').valid('others').required(),
        occupation: Joi.string().min(2).required(),
        password: Joi.string().min(4).required()
    })

    return JoiSchema.validate(obj);
}

const validateDoctorSignup = obj =>{
    const JoiSchema = Joi.object({
        first_name: Joi.string().min(2).required(),
        middle_name: Joi.string().min(2).required(),
        last_name : Joi.string().min(2).required(),
        experience: Joi.number().min(1).required(),
        password: Joi.string().min(4).required()
    })

    return JoiSchema.validate(obj);
}

export {
    validatePatientSignup,
    validateDoctorSignup
};