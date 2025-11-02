import db from "../models";

const Service = db.Service;
const Category = db.Category;
export const getAllServices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Service.findAll({
        include: [
          { model: Category, as: "category", attributes: ["id", "name"] },
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
export const createService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Service.create(data);
      resolve({
        err: 0,
        msg: "Create service successfully",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const updateService = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const service = await Service.findByPk(id);
      if (!service)
        return resolve({ err: 1, msg: "Service not found", data: null });
      await service.update(data);
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
