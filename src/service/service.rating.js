import db from "../models";
import { Op } from "sequelize";
const Booking = db.Booking;
const Rating = db.Rating;
const User = db.User;
const Service = db.Service;
export const createRating = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { booking_id, user_id, rating, comment } = payload;
      const booking = await Booking.findOne({
        where: { id: booking_id },
      });
      if (!booking) {
        return resolve({ err: 1, mes: "Booking not found" });
      }
      if (Number(booking.user_id) !== Number(user_id)) {
        return { err: 1, mes: "You can't rate this booking" };
      }
      const existing = await Rating.findOne({
        where: { booking_id, user_id },
      });
      if (existing) {
        return resolve({ err: 1, mes: "You rating is already" });
      }
      const newRating = await Rating.create({
        booking_id,
        user_id,
        service_id: booking.service_id,
        staff_id: booking.staff_id,
        rating,
        comment,
      });
      return resolve({
        err: 0,
        mess: "Rating created successfully",
        data: newRating,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllRatingStaff = (staff_id, filter = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const where = { staff_id };
      if (filter.rating) {
        where.rating = filter.rating;
      }
      if (filter.service_id) {
        where.service_id = filter.service_id;
      }
      if (filter.from && filter.to) {
        where.createdAt = {
          [Op.between]: [new Date(filter.from), new Date(filter.to)],
        };
      } else if (filter.from) {
        where.createdAt = { [Op.gte]: new Date(filter.from) };
      } else if (filter.to) {
        where.createdAt = { [Op.lte]: new Date(filter.to) };
      }
      const ratings = await Rating.findAndCountAll({
        where,
        include: [
          {
            model: User,
            as: "customer",
            attributes: ["id", "full_name", "phone_number"],
          },
          {
            model: Service,
            as: "service",
            attributes: ["id", "name"],
          },
          {
            model: Booking,
            as: "booking",
            attributes: ["id", "status", "booking_date"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      resolve({
        err: 0,
        mes: "Get Rating success",
        date: ratings,
      });
    } catch (error) {
      reject(error);
    }
  });
};
