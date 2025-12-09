import * as service from "../service";
import { internalSvError, badRequest } from "../middlewares/handle_error";
import Joi from "joi";

export const getAllFavorites = async (req, res) => {
  try {
    const { error, value } = Joi.object().validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const user_id = req.user.id;
    const service_id = value.service_id;
    const response = await service.getAllFavorite(user_id, service_id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
export const addFavorites = async (req, res) => {
  try {
    const { error } = Joi.object().validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const user_id = req.user.id;
    const { service_id } = req.body;
    const response = await service.addFavorite(user_id, service_id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
export const removeFavorites = async (req, res) => {
  try {
    const { error } = Joi.object().validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const user_id = req.user.id;
    const { service_id } = req.body;
    const response = await service.removeFavorite(user_id, service_id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
