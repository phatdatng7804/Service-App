import { where } from "sequelize";
import db from "../models";

const Favorite = db.Favorite;
const User = db.User;
const Service = db.Service;
export const addFavorite = (user_id, service_id) => {
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(user_id);
      if (!user) {
        return resolve({ err: 1, mes: "User not found" });
      }
      const service = await Service.findByPk(service_id);
      if (!service) {
        return resolve({ err: 1, mes: "Service not found" });
      }
      const existing = await Favorite.findOne({
        where: { user_id, service_id },
      });
      if (existing) {
        return resolve({ err: 1, mes: "Favorite already exists" });
      }
      const favorite = await Favorite.create({ user_id, service_id });
      return resolve({
        err: 0,
        mes: "Favorite added successfully",
        data: favorite,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const removeFavorite = (user_id, service_id) => {
  new Promise(async (resolve, reject) => {
    try {
      const favorite = await Favorite.findOne({
        where: { user_id, service_id },
      });
      if (!favorite) {
        return resolve({ err: 1, mes: "Favorite not found" });
      }
      await favorite.destroy();
      return resolve({ err: 0, mes: "Favorite removed successfully" });
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllFavorite = (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const favorites = await Favorite.findAll({
        where: { user_id },
        include: [
          {
            model: Service,
            as: "service",
            attributes: ["id", "name", "description", "price", "image"],
          },
        ],
      });
      return resolve({
        err: 0,
        mes: "Favorites retrieved successfully",
        data: favorites,
      });
    } catch (error) {
      reject(error);
    }
  });
};
