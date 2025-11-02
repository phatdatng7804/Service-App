import db from "../models";

const Staff = db.StaffService;
const Service = db.Service;

export const assignServiceToStaff = (staffId, serviceId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const [assignment, created] = await Staff.findOrCreate({
        where: { staff_id: staffId, service_id: serviceId },
        defaults: { ...data, staff_id: staffId, service_id: serviceId },
      });
      resolve({
        err: created ? 0 : 1,
        msg: created
          ? "Service assigned to staff successfully"
          : "Staff is already assigned to this service",
        data: created ? assignment : null,
      });
    } catch (error) {
      reject(error);
    }
  });
