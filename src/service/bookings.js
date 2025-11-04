import db from "../models";
import { Op } from "sequelize";
const Booking = db.Booking;
const Service = db.Service;

export const createBooking = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const service = await Service.findByPk(id, {
        include: [
          { model: db.User, as: "staff", attributes: ["id", "full_name"] },
        ],
      });
      if (!service) return resolve({ err: 1, mes: "Service not found" });

      const staff_id = service.staff.id;
      if (!staff_id) return resolve({ err: 1, mes: "Staff not found" });

      const conflict = await Booking.findOne({
        where: {
          staff_id,
          booking_date,
          start_time,
          [Op.or]: [
            { start_time: { [Op.between]: [start_time, service.duration] } },
            { end_time: { [Op.between]: [start_time, service.duration] } },
          ],
          status: { [Op.in]: ["pending", "confirmed"] },
        },
      });
      if (conflict)
        return resolve({
          err: 1,
          mes: "Time slot already booked for this staff",
        });

      const booking = await Booking.create(data);
      resolve({
        err: 0,
        mes: "Create booking successfully",
        booking: booking,
      });
    } catch (error) {
      reject(error);
    }
  });
