import * as service from "../service";
import { internalSvError, badRequest } from "../middlewares/handle_error";
import Joi from "joi";
import {
  deviceTokenSchema,
  sendNotificationSchema,
} from "../helper/joi_deviceToken";
export const registerDeviceTokens = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { error, value } = deviceTokenSchema.validate(req.body, {
      abortEarly: false,
      skipFunctions: true,
    });
    if (error) return badRequest(error.details[0].message, res);
    const payload = {
      user_id,
      fcm_token: value.fcm_token,
      platform: value.platform,
      device_id: value.device_id,
    };
    const response = await service.registerDeviceToken(payload);
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(error);
  }
};
export const sendNotification = async (req, res) => {
  try {
    const { error, value } = sendNotificationSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) return badRequest(error.details[0].message, res);
    const targetUserId = value.user_id || req.user?.id;
    const response = await service.sendNotificationToUser(
      targetUserId,
      value.title,
      value.body,
      value.data
    );
    return res.status(200).json(response);
  } catch (error) {
    return internalSvError(error);
  }
};
