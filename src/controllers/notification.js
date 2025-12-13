import * as service from "../service";
import { internalSvError, badRequest } from "../middlewares/handle_error";
import {
  notificationListSchema,
  notificationIdSchema,
} from "../helper/joi_notification";

export const getMyNotifications = async (req, res) => {
  try {
    const user_id = req.user?.id;
    if (!user_id) {
      return badRequest("User not authenticated", res);
    }
    const { error, value } = notificationListSchema.validate(req.query, {
      abortEarly: false,
      skipFunctions: true,
    });
    if (error) return badRequest(error.details[0].message, res);
    const page = Number(value.page || 1);
    const limit = Number(value.limit || 20);
    const response = await service.getMyNotification({
      user_id,
      page,
      limit,
    });
    return res.status(200).json(response);
  } catch (err) {
    return internalSvError(err, res);
  }
};
