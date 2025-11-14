import * as service from "../service";
import { internalSvError, badRequest } from "../middlewares/handle_error";
import Joi from "joi";
import { createRatingSchema } from "../helper/joi_rating.js";

export const createRatings = async (req, res) => {
  try {
    const { error } = createRatingSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const payload = {
      ...req.body,
      user_id: req.user.id,
    };
    const response = await service.createRating(payload);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
export const getAllRatingStaffs = async (req, res) => {
  try {
    const staff_id = req.user.id;
    const filter = req.query;
    const { error } = Joi.object().validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await service.getAllRatingStaff(staff_id, filter);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
