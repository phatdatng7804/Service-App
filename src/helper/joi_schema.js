import Joi from "joi";

export const numberPhone = Joi.string()
  .pattern(new RegExp("^[0-9]{10}$"))
  .required();
export const password = Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
  .required();
