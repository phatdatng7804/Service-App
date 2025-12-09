import Joi from "joi";
export const deviceTokenSchema = Joi.object({
  fcm_token: Joi.string().required(),
  platform: Joi.string().valid("android", "ios", "unknown").default("unknown"),
  device_id: Joi.string().allow(null, "").default(null),
});
export const sendNotificationSchema = Joi.object({
  user_id: Joi.number().integer().optional(),
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  body: Joi.string().required().messages({
    "string.empty": "Body is required",
  }),

  data: Joi.object().unknown(true).default({}),
});
