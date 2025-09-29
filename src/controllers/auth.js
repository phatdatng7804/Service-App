import * as service from "../service";
import { internalSvError, badRequest } from "../middlewares/handle_error";
import { numberPhone, password } from "../helper/joi_schema";
import Joi from "joi";

export const register = async (req, res) => {
  try {
    const schema = Joi.object({ numberPhone: numberPhone, password: password });
    const { error } = schema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const { numberPhone: phone, password: pass } = req.body;
    const response = await service.register(phone, pass);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
export const login = async (req, res) => {
  try {
    const schema = Joi.object({ numberPhone: numberPhone, password: password });
    const { error, value } = schema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const { numberPhone: phone, password: pass } = value;

    const response = await service.login(phone, pass);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
