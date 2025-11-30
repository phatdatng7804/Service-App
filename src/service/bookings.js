import db from "../models";
import { Sequelize, Op } from "sequelize";

import {
  notifyBookingCreated,
  notifyBookingConfirmed,
  notifyBookingIncoming,
  notifyBookingCompleted,
  notifyBookingCanceled,
} from "./appNotification";

const Booking = db.Booking;
const Service = db.Service;
const Cancel = db.BookingCancel;
const User = db.User;
export const getAllBooking = (user, filter = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const where = {};
      if (filter.status) {
        where.status = filter.status;
      }
      if (filter.date) {
        where.booking_date = filter.date;
      }
      if (Number(user.roleId) === 1) {
      } else if (Number(user.roleId) === 2) {
        where.staff_id = user.id;
      } else if (Number(user.roleId) === 3) {
        where.user_id = user.id;
      }
      const bookings = await Booking.findAll({
        where,
        include: [
          {
            model: User,
            as: "customer",
            attributes: ["id", "full_name", "email"],
          },
          {
            model: User,
            as: "staff",
            attributes: ["id", "full_name", "email"],
          },
          {
            model: Service,
            as: "service",
            attributes: ["id", "name"],
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
export const createBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    const transaction = await db.sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      const {
        service_id,
        number_phone,
        booking_date,
        start_time,
        end_time,
        note,
      } = data;
      const user_id = data.user_id || data.user?.id || data.req?.user?.id;
      if (!user_id) {
        await transaction.rollback();
        return resolve({ err: 1, mes: "User ID is required" });
      }
      const service = await Service.findByPk(service_id, {
        include: [
          { model: User, as: "creator", attributes: ["id", "full_name"] },
        ],
        transaction: transaction,
      });
      if (!service) {
        await transaction.rollback();
        return resolve({ err: 1, mes: "Service not found" });
      }
      const staff_id = service.creator?.id;
      if (!staff_id) {
        await transaction.rollback();
        return resolve({ err: 1, mes: "No staff assigned to this service" });
      }
      let numberPhone = number_phone;
      if (!numberPhone && user_id) {
        const customer = await User.findByPk(user_id, {
          transaction,
        });
        numberPhone = customer?.phone_number || "";
      }
      const conflict = await Booking.findOne({
        where: {
          staff_id,
          booking_date,
          [Op.and]: [
            { start_time: { [Op.lt]: end_time } },
            { end_time: { [Op.gt]: start_time } },
          ],
          status: { [Op.in]: ["pending", "confirmed"] },
        },
        transaction,
      });
      if (conflict) {
        await transaction.rollback();
        return resolve({
          err: 1,
          mes: "Time slot already booked for this staff",
        });
      }
      const newBooking = await Booking.create({
        service_id,
        user_id,
        number_phone: numberPhone,
        staff_id,
        booking_date,
        start_time,
        end_time,
        status: "pending",
        note,
        total_price: service.price,
      });
      await transaction.commit();
      notifyBookingCreated(user_id, newBooking).catch((e) =>
        console.log("notifyBookingCreated (customer) error:", e.message)
      );
      notifyBookingCreated(staff_id, newBooking).catch((e) =>
        console.log("notifyBookingCreated (staff) error:", e.message)
      );
      resolve({
        err: 0,
        mes: "Booking created successfully",
        booking: newBooking,
      });
    } catch (error) {
      await transaction.rollback();
      reject(error);
    }
  });
};
export const updateBooking = (id, status, note, user) =>
  new Promise(async (resolve, reject) => {
    try {
      const booking = await Booking.findByPk(id, {
        include: {
          model: Service,
          as: "service",
          attributes: ["id", "created_by"],
        },
      });
      if (!booking) return resolve({ err: 1, mes: "Booking not found" });
      if (booking.service?.created_by !== user.id) {
        return resolve({
          err: 1,
          mes: "You are not authorized to update this booking",
        });
      }

      const validStatuses = ["pending", "confirmed", "completed", "canceled"];
      if (!validStatuses.includes(status)) {
        return resolve({ err: 1, mes: "Invalid status value" });
      }
      booking.status = status;
      if (note) {
        booking.note = note;
      }
      await booking.save();
      const providerName = booking.staff?.full_name;
      if (status === "confirmed") {
        notifyBookingConfirmed(booking.user_id, booking, providerName).catch(
          (e) =>
            console.log("notifyBookingConfirmed (customer) error:", e.message)
        );
      } else if (status === "completed") {
        notifyBookingCompleted(booking.user_id, booking).catch((e) =>
          console.log("notifyBookingCompleted error:", e.message)
        );
      }
      //
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
export const cancelBooking = (id, cancel_by, cancel_note, user) =>
  new Promise(async (resolve, reject) => {
    try {
      const booking = await Booking.findByPk(id);
      if (!booking) return resolve({ err: 1, mes: "Booking not found" });

      if (booking.user_id !== user.id && booking.staff_id !== user.id) {
        return resolve({
          err: 1,
          mes: "You are not authorized to cancel this booking",
        });
      }
      if (booking.status === "canceled") {
        return resolve({ err: 1, mes: "Booking is already canceled" });
      }
      if (booking.status === "completed") {
        return resolve({ err: 1, mes: "Completed booking cannot be canceled" });
      }
      await db.BookingCancel.create({
        booking_id: id,
        cancel_by,
        cancel_note,
      });
      booking.status = "canceled";
      await booking.save();
      notifyBookingCanceled(booking.user_id, booking, cancel_note).catch((e) =>
        console.log("notifyBookingCanceled (customer) error:", e.message)
      );
      if (booking.staff_id) {
        notifyBookingCanceled(booking.staff_id, booking, cancel_note).catch(
          (e) => console.log("notifyBookingCanceled (staff) error:", e.message)
        );
      }
      resolve({
        err: 0,
        mes: "Booking canceled successfully",
        booking: booking,
      });
    } catch (error) {
      reject(error);
    }
  });
export const cancelAllBooking = (staff_id, note) =>
  new Promise(async (resolve, reject) => {
    const transaction = await db.sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const bookings = await Booking.findAll({
        where: {
          staff_id,
          booking_date: { [Op.between]: [startOfDay, endOfDay] },
          status: { [Op.in]: ["pending", "confirmed"] },
        },
        include: [
          {
            model: User,
            as: "customer",
            attributes: ["id", "full_name", "phone_number"],
          },
          {
            model: Service,
            as: "service",
            attributes: ["id", "created_by"],
          },
        ],
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!bookings.length) {
        await transaction.rollback();
        return resolve({
          err: 1,
          mes: "No booking today",
        });
      }
      const validBookings = bookings.filter(
        (b) => b.service?.created_by === staff_id
      );

      if (!validBookings.length) {
        await transaction.rollback();
        return resolve({
          err: 1,
          mes: "You are not authorized to cancel these bookings",
        });
      }
      const bookingId = await bookings.map((b) => b.id);
      await Booking.update(
        { status: "canceled" },
        { where: { id: { [Op.in]: bookingId } }, transaction }
      );
      const cancelLogs = bookings.map((b) => ({
        booking_id: b.id,
        cancel_by: staff_id,
        cancel_note: note || "Staff unavailable",
      }));
      await Cancel.bulkCreate(cancelLogs, { transaction });
      await transaction.commit();
      const reason = note || "Staff unavailable";
      bookings.forEach((b) => {
        notifyBookingCanceled(b.user_id, b, reason).catch((e) =>
          console.log(
            "notifyBookingCanceled (cancelAll, customer) error:",
            e.message
          )
        );
      });
      resolve({
        err: 0,
      });
    } catch (error) {
      await transaction.rollback();
      reject(error);
    }
  });
