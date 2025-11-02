import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().allow("", null),
  is_active: Joi.boolean().optional(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  description: Joi.string().allow("", null).optional(),
  is_active: Joi.boolean().optional(),
});
