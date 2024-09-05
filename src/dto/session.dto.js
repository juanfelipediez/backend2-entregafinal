import Joi from "joi";

export const userDto = Joi.object({
    password: Joi.string().required(),
    first_name: Joi.string().trim().required(),
    last_name: Joi.string().trim().required(),
    email: Joi.string().email().lowercase().required(),
    age: Joi.string().required(),
});