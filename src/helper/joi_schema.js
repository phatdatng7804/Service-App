import Joi from "joi";

export const numberPhone = Joi.string()
  .pattern(new RegExp("^[0-9]{10}$"))
  .required();
export const password = Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
  .required();
export const RegisterSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  numberPhone: numberPhone,
  password: password,
});
