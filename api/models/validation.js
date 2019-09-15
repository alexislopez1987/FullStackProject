const Joi = require('@hapi/joi');

const registerValidation = (user) => {
    const validationUserSchema = Joi.object({
        name: Joi.string().min(5).required(),
        lastName: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return validationUserSchema.validate(user);
}

const loginValidation = (user) => {
    const validationUserSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return validationUserSchema.validate(user);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;