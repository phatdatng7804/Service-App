import * as service from "../service";
import { internalSvError, badRequest } from "../middlewares/handle_error";
import { serviceSchema, updateSchema } from "../helper/joi_service";
import Joi from "joi";

export const getAllServices = async (req, res) => {
  try {
    const { error } = Joi.object().validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await service.getAllServices();
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
export const createService = async (req, res) => {
  try {
    const schema = serviceSchema;
    const { error } = schema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);

    const payload = { ...req.body, created_by: req.user.id };
    const response = await service.createService(payload);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
export const updateService = async (req, res) => {
  try {
    const schema = updateSchema;
    const { error } = schema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await service.updateService(req.params.id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
export const deleteService = async (req, res) => {
  try {
    const response = await service.deleteService(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
