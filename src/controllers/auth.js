import * as service from "../service";
import { internalSvError, badRequest } from "../middlewares/handle_error";
import {
  forgotSchema,
  numberPhone,
  passResetSchema,
  password,
  RegisterSchema,
  verifySchema,
  verifyOTP,
  numberPhone,
  password,
  RegisterSchema,
  verifySchema,
} from "../helper/joi_schema";
import Joi from "joi";

export const register = async (req, res) => {
  try {
    const { error } = RegisterSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await service.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
export const verify = async (req, res) => {
  try {
    const { error, value } = verifySchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);

    const { numberPhone: phone, otp } = value;

    const response = await service.verifyOTP(phone, otp);
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
    return internalSvError(res);
  }
};
export const forgot = async (req, res) => {
  try {
    const { error, value } = forgotSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);

    const { numberPhone } = value;

    const response = await service.forgotPass(numberPhone);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
export const verifyReset = async (req, res) => {
  try {
    const { error, value } = verifyOTP.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const { otp } = value;
    const response = await service.verifyResetOTP(otp);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
export const passReset = async (req, res) => {
  try {
    const { error, value } = passResetSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const { newPassword } = value;
    const response = await service.resetPassword(newPassword);
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
