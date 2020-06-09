import Joi from '@hapi/joi';

export const userSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email()
});