import Joi from "joi";
import role from "../models/role";

export const filterUserSchema = Joi.object({
  role_id: Joi.number().integer().valid(1, 2, 3).optional(),
  is_active: Joi.boolean().optional(),
  q: Joi.string().trim().max(30).optional(),
});

export const updateUserSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().allow(null, "").optional(),
  phone_number: Joi.string().pattern(new RegExp("^[0-9]{10}$")).optional(),
  role_id: Joi.number().integer().valid(1, 2, 3).optional(),
  is_active: Joi.boolean().optional(),
});

export const toggleUserSchema = Joi.object({
  is_active: Joi.boolean().required(),
});
