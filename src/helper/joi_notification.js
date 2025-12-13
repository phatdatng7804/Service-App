import Joi from "joi";

export const notificationListSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
});
export const notificationIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});
