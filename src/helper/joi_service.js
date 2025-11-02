import Joi from "joi";

export const serviceSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().allow("", null),
  duration_minutes: Joi.number().integer().min(1).required(),
  price: Joi.number().integer().min(10000).required(),
  category_id: Joi.number().integer().required(),
  is_active: Joi.boolean().optional(),
});
export const updateSchema = Joi.object({
  name: Joi.string().min(3).max(150).optional(),
  description: Joi.string().allow("", null).optional(),
  duration_minutes: Joi.number().integer().min(1).optional(),
  price: Joi.number().integer().min(10000).optional(),
  category_id: Joi.number().integer().optional(),
  is_active: Joi.boolean().optional(),
});
