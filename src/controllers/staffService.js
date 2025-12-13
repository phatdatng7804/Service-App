import * as service from "../service";
import { internalSvError, badRequest } from "../middlewares/handle_error";

export const updateMyStaffProfiles = async (req, res) => {
  try {
    const staffId = req.user.id;
    const response = await service.updateMyStaffProfile(staffId, req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalSvError(res);
  }
};
