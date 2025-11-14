import Joi from "joi";

export const createBookingSchema = Joi.object({
  service_id: Joi.number().integer().required().messages({
    "any.required": "Service ID is required",
    "number.base": "Service ID must be a number",
  }),
  customer_id: Joi.number().integer().positive().optional(),
  booking_date: Joi.date().iso().required().messages({
    "any.required": "Booking date is required",
    "date.base": "Booking date must be a valid date",
  }),
  number_phone: Joi.string()
    .pattern(/^[0-9]{9,11}$/)
    .allow("", null)
    .optional(),
  start_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "The start time must be in the format HH:mm (24h)",
      "any.required": "Start time is required",
    }),
  end_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "The end time must be in the format HH:mm (24h)",
      "any.required": "End time is required",
    }),
  note: Joi.string().allow("", null).max(255),
});
export const updateBookingSchema = Joi.object({
  service_id: Joi.number().integer().positive().optional(),
  booking_date: Joi.date().iso().optional(),

  start_time: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .optional(),
  end_time: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .optional(),
  status: Joi.string()
    .valid("pending", "confirmed", "completed", "canceled")
    .optional(),
  note: Joi.string().allow("", null).max(255).optional(),
});
export const cancelAllBookingsSchema = Joi.object({
  cancel_note: Joi.string().allow("", null).max(255).optional(),
});
export const cancelBookingSchema = Joi.object({
  cancel_note: Joi.string().allow("", null).max(255).optional(),
});
