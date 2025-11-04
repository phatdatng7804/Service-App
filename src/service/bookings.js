import db from "../models";
import { Op } from "sequelize";
const Booking = db.Booking;
const Service = db.Service;

export const creatBooking = (data) =>
  new Promise(async (reslove, reject) => {
    try {
      const { service_id, user_id, booking_date, start_time, note } = data;
      const service = await Service.findByPk(service_id, {
        include: [
          { model: db.User, as: "staff", attributes: ["id", "full_name"] },
        ],
      });
      if (!service) throw new Error("Service not found");

      const total_price = service.price;
      const staff_id = service.staff.id;

      const conflict = await Booking.findOne({
        where: {
          staff_id,
          booking_date,
          start_time,
          [Op.or]: [
            {
              start_time: { [Op.between]: [start_time, service.duration] },
            },
          ],
        },
      });
      const booking = await Booking.creat(data);
    } catch (error) {
      reject(error);
    }
  });
