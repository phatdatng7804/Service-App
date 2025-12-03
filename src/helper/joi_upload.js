import Joi from "joi";

export const uploadSchema = Joi.object({
  full_name: Joi.string().min(3).max(50),
  gender: Joi.string().valid("male", "female", "other"),
}).min(1);
