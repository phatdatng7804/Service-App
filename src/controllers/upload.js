import * as service from "../service";
import { internalSvError, badRequest } from "../middlewares/handle_error";
import { uploadSchema } from "../helper/joi_upload";
import Joi from "joi";

export const uploadFiles = async (req, res) => {
  try {
    const { error } = Joi.object().validate(req.params);
    if (error) return badRequest(error.details[0].message, res);
    const userId = req.user?.id;
    const response = await service.uploadUser(userId, req.file);
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(res);
  }
};
export const updateUser = async (req, res) => {
  try {
    const { error } = uploadSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const userId = req.user?.id;
    const response = await service.updateUserInfo(userId, req.body);
    return res.status(200).json({
      err: 0,
      mes: "User information updated successfully",
      data: req.body,
    });
  } catch (error) {
    return internalSvError(res);
  }
};
