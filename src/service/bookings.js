import db from "../models";
import { Sequelize, Op } from "sequelize";
import { sendCSKHSMS } from "./smsService";

const Booking = db.Booking;
const Service = db.Service;
const Cancel = db.BookingCancel;
const User = db.User;
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
    const traction = await db.sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      const today = new Date().toISOString().split("T")[0];

      const bookings = await Booking.findAll({
        where: {
          staff_id,
          booking_date: today,
          status: { [Op.in]: ["pending", "confirmed"] },
        },
        include: [
          {
            model: db.User,
            as: "customer",
            attributes: ["id", "full_name", "phone_number"],
          },
        ],
        traction,
        lock: traction.LOCK.UPDATE,
      });
      if (!bookings.length) {
        await traction.rollback();
        return resolve({
          err: 1,
          mes: "No booking today",
        });
      }
      const bookingId = await bookings.map((b) => b.id);
      await Booking.update(
        { status: "canceled" },
        { where: { id: { [Op.in]: bookingId } } },
        traction
      );
      const cancelLogs = bookings.map((b) => ({
        booking_id: b.id,
        cancelled_by: staff_id,
        cancel_not: note || "Staff unavailable",
      }));
      await Cancel.bulkCreate(cancelLogs, { traction });
      await traction.commit();

      const customers = bookings
        .filter((b) => b.customer?.phone_number)
        .map((b) => ({
          name: b.customer.full_name,
          phone: b.customer.phone_number.startsWith("84")
            ? b.customer.phone_number
            : `84${b.customer.phone_number.replace(/^0+/, "")}`,
        }));
      console.log(`Sending cancellation SMS to ${customers.length} customers`);
      for (const c of customers) {
        const message = `Dear ${c.name}, lịch hẹn của bạn hôm nay đã bị hủy do việc khẩn cấp. Chúng tôi xin lỗi vì sự bất tiện này. `;
        const result = await sendCSKHSMS(c.phone, message);

        console.log(
          result.err === 0
            ? `SMS sent to ${c.phone}`
            : `Failed to send SMS to ${c.phone}`
        );
      }
      resolve({
        err: 0,
      });
    } catch (error) {
      await traction.rollback();
      reject(error);
    }
  });
