import * as service from "../service";

import { internalSvError, badRequest } from "../middlewares/handle_error";
import {
  createBookingSchema,
  updateBookingSchema,
  cancelBookingSchema,
  cancelAllBookingsSchema,
} from "../helper/joi_bookings";

import Joi from "joi";

export const getAllBookings = async (req, res) => {
  try {
    const { error } = Joi.object().validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await service.getAllBooking();
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
export const createBookings = async (req, res) => {
  try {
    const schema = createBookingSchema;
    const { error } = schema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const payload = { ...req.body, user_id: req.user.id };
    const response = await service.createBooking(payload);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
export const updateBookings = async (req, res) => {
  try {
    const schema = updateBookingSchema;
    const { error } = schema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const { status, note } = req.body;
    const response = await service.updateBooking(
      req.params.id,
      status,
      note,
      req.user
    );
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
export const cancelBookings = async (req, res) => {
  try {
    const schema = cancelBookingSchema;
    const { error } = schema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const { cancel_note } = req.body;
    const user = req.user;
    const response = await service.cancelBooking(
      req.params.id,
      user.id,
      cancel_note,
      user
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
export const cancelAllBookings = async (req, res) => {
  try {
    const schema = cancelAllBookingsSchema;
    const { error } = schema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await service.cancelAllBooking(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
