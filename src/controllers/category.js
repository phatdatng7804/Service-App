import * as service from "../service";
import { internalSvError, badRequest } from "../middlewares/handle_error";
import { categorySchema, updateCategorySchema } from "../helper/joi_category";
import Joi from "joi";
export const getAllCategories = async (req, res) => {
  try {
    const { error } = Joi.object().validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await service.getAllCategories();
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
export const createCategory = async (req, res) => {
  try {
    const schema = categorySchema;
    const { error } = schema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await service.createCategory(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
export const updateCategory = async (req, res) => {
  try {
    const schema = updateCategorySchema;
    const { error } = schema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await service.updateCategory(req.params.id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { error } = Joi.object().validate(req.params);
    if (error) return badRequest(error.details[0].message, res);
    const response = await service.deleteCategory(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
