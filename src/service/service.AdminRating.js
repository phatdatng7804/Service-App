import db from "../models";
import { Op } from "sequelize";
const Booking = db.Booking;
const Rating = db.Rating;
const User = db.User;
const Service = db.Service;
export const getAllRating = (filter = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const where = {};
      if (filter.rating) {
        where.rating = filter.rating;
      }
      if (filter.staff_id) {
        where.staff_id = filter.staff_id;
      }
      if (filter.service_id) {
        where.service_id = filter.service_id;
      }
      if (filter.from && filter.to) {
        where.createdAt = {
          [Op.between]: [new Date(filter.from), new Date(filter.to)],
        };
      } else if (filter.from) {
        where.createdAt = {
          [Op.gte]: new Date(filter.from),
        };
      } else if (filter.to) {
        where.createdAt = {
          [Op.lte]: new Date(filter.to),
        };
      }
      const ratings = await Rating.findAll({
        where,
        include: [
          {
            model: User,
            as: "customer",
            attributes: ["id", "full_name", "phone_number"],
          },
          {
            model: User,
            as: "staff",
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
        mes: "Get all rating success",
        data: ratings,
      });
    } catch (error) {
      reject(error);
    }
  });
};
