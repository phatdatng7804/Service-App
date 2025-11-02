import * as service from "../service";
import Joi from "joi";
import { internalSvError, badRequest } from "../middlewares/handle_error";
import {
  filterUserSchema,
  updateUserSchema,
  toggleUserSchema,
} from "../helper/joi_adminUser";

export const getAllUsers = async (req, res) => {
  try {
    const { error } = filterUserSchema.validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await service.getAllUsers(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
export const updateUser = async (req, res) => {
  try {
    const { error } = updateUserSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const userId = req.params.id;
    const response = await service.updateUserById(userId, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
export const toggleUserActiveStatus = async (req, res) => {
  try {
    const { error } = toggleUserSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);

    const userId = req.params.id;
    const { is_active } = req.body;

    const response = await service.toggleUserActiveStatus(userId, is_active);
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { error } = Joi.object().validate(req.params);
    if (error) return badRequest(error.details[0].message, res);
    const userId = req.params.id;
    const response = await service.deleteUserById(userId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
