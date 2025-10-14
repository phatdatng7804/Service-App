import { where } from "sequelize";
import db from "../models";
const Category = db.Category;
export const getAllCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        order: [["createdAt", "DESC"]],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response
          ? "Get all categories success"
          : "Get all categories failed",
        categories: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const createCategory = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const [category, created] = await db.Category.findOrCreate({
        where: { name: data.name },
        defaults: {
          name: data.name,
          description: data.description || null,
        },
      });
      resolve({
        err: created ? 0 : 1,
        mes: created
          ? "Create category success"
          : "Category name already exists",
        category: created ? category : null,
      });
    } catch (error) {
      reject(error);
    }
  });
export const updateCategory = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await Category.findByPk(id);
      if (!category)
        return resolve({ err: 1, mes: "Category not found", data: null });

      await category.update({
        name: data.name ?? category.name,
        description: data.description ?? category.description,
      });

      resolve({
        err: 0,
        mes: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      reject(error);
    }
  });
export const deleteCategory = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await db.Category.findByPk(id);
      if (!category)
        return resolve({ err: 1, mes: "Category not found", data: null });

      await category.destroy();
      resolve({ err: 0, mes: "Category deleted successfully" });
    } catch (error) {
      reject(error);
    }
  });
