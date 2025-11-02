import db from "../models";
const User = db.User;

export const getAllUsers = () =>
  new Promise(async (resolve, reject) => {
    try {
      const users = await User.findAll({
        include: [
          { model: db.Role, as: "role", attributes: ["id", "role", "value"] },
        ],
        order: [["createdAt", "DESC"]],
      });
      resolve({
        err: 0,
        mes: "Get all users success",
        users: users,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
export const updateUserById = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(id);
      if (!user) return resolve({ err: 1, mes: "User not found", data: null });
      await user.update(data);
      resolve({
        err: 0,
        mes: "User updated successfully",
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
export const deleteUserById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(id);
      if (!user) return resolve({ err: 1, mes: "User not found" });

      await user.destroy();
      resolve({ err: 0, mes: "User deleted successfully" });
    } catch (error) {
      reject(error);
    }
  });
export const toggleUserActiveStatus = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(id);

      if (!user) return resolve({ err: 1, mes: "User not found" });

      user.is_active = !user.is_active;
      await user.save();
      resolve({
        err: 0,
        mes: `User is now ${user.is_active ? "active" : "inactive"}`,
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
