import db from "../models";
import cloudinary from "../config/cloudinary";
import { up } from "../migrations/20251123140348-add-avatar";
import { fn } from "sequelize";
const User = db.User;
const Service = db.Service;
const Category = db.Category;
const Rating = db.Rating;
export const getAllServices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Service.findAll({
        include: [
          { model: Category, as: "category", attributes: ["id", "name"] },
          {
            model: Rating,
            as: "ratings",
            attributes: [],
          },
        ],
        attributes: {
          include: [
            [fn("AVG", col("ratings.rating")), "average_rating"][
              (fn("COUNT", col("ratings.id")), "rating_count")
            ],
          ],
        },
        group: ["Service.id", "category.id"],
        order: [["createdAt", "DESC"]],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "No data",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getMyServices = ({ staffId }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Service.findAll({
        where: { created_by: staffId },
        include: [
          { model: Category, as: "category", attributes: ["id", "name"] },
          { model: User, as: "creator", attributes: ["id", "full_name"] },
        ],
        order: [["createdAt", "DESC"]],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "No data",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const createService = (data, file) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!file) {
        return resolve({
          err: 1,
          msg: "Image is required",
          data: null,
        });
      }
      const { secure_url } = await uploadToCloudinary(file);

      const response = await Service.create({
        ...data,
        image: secure_url,
      });
      resolve({
        err: 0,
        msg: "Create service successfully",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const updateService = (id, data, file) =>
  new Promise(async (resolve, reject) => {
    try {
      const service = await Service.findByPk(id);
      if (!service)
        return resolve({ err: 1, msg: "Service not found", data: null });
      let imageUrl = service.image;
      if (file) {
        if (service.image) {
          const publicId = service.image.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`service_images/${publicId}`);
        }
        const result = await uploadToCloudinary(file, "service_images");
        imageUrl = result.secure_url;
      }
      await service.update({
        ...data,
        image: imageUrl,
      });
      resolve({
        err: 0,
        msg: "Service updated successfully",
        data: service,
      });
    } catch (error) {
      reject(error);
    }
  });
export const deleteService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const service = await Service.findByPk(id);
      if (!service)
        return resolve({ err: 1, msg: "Service not found", data: null });
      await service.destroy();
      resolve({
        err: 0,
        msg: "Service deleted successfully",
        data: null,
      });
    } catch (error) {
      reject(error);
    }
  });
const uploadToCloudinary = (file, folder = "services") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [{ width: 500, height: 500, crop: "fill" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
