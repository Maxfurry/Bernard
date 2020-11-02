import Joi from 'joi';

const loginValidationTest = obj =>{
    const JoiSchema = Joi.object({
        username: Joi.string().min(2).required(),
        password: Joi.string().min(4).required()
    })

    return JoiSchema.validate(obj);
}

export default loginValidationTest;