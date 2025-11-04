import db from "../models";
import { Op } from "sequelize";
const Booking = db.Booking;
const Service = db.Service;

export const getAllBooking = (filter = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const where = {};
      if (filter.status) {
        where.status = filter.status;
      }
      if (filter.staff_id) {
        where.staff_id = filter.staff_id;
      }
      if (filter.date) {
        where.booking_date = filter.date;
      }
      const bookings = await Booking.findAll({
        where,
        include: [
          {
            model: db.User,
            as: "customer",
            attributes: ["id", "full_name", "email"],
          },
          {
            model: db.User,
            as: "staff",
            attributes: ["id", "full_name", "email"],
          },
          {
            model: db.Service,
            as: "service",
            attributes: ["id", "name", "duration"],
          },
        ],
        order: [
          ["booking_date", "DESC"],
          ["start_time", "ASC"],
        ],
      });
      resolve({
        err: 0,
        mes: "Get all bookings success",
        bookings: bookings,
      });
    } catch (error) {
      reject(error);
    }
  });
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
export const updateBooking = (id, status, note) =>
  new Promise(async (resolve, reject) => {
    try {
      const booking = await Booking.findByPk(id);
      if (!booking) return resolve({ err: 1, mes: "Booking not found" });

      const validStatuses = ["pending", "confirmed", "completed", "canceled"];
      if (!validStatuses.includes(status)) {
        return resolve({ err: 1, mes: "Invalid status value" });
      }

      if (booking.status === "completed") {
        return resolve({ err: 1, mes: "Cannot update a completed booking" });
      }
      booking.status = status;
      if (note) {
        booking.note = note;
      }
      await booking.save();
      resolve({
        err: 0,
        mes: "Booking status updated successfully",
        booking: booking,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
