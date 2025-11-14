import * as service from "../service";
import { internalSvError, badRequest } from "../middlewares/handle_error";
import Joi from "joi";
export const getAllRatingAdmins = async (req, res) => {
  try {
    const admin_id = req.user.id;
    const filter = req.query;
    const { error } = Joi.object().validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await service.getAllRating(admin_id, filter);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
