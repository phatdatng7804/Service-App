import db from "../models";

const Notification = db.Notification;

export const getMyNotification = ({ user_id, page = 1, limit = 20 }) =>
  new Promise(async (resolve, reject) => {
    try {
      const offset = (page - 1) * limit;
      const { rows, count } = await Notification.findAndCountAll({
        where: { user_id },
        order: [["createAt", "DESC"]],
        limit,
        offset,
      });
      return resolve({
        err: 0,
        mes: "Get notification successfully",
        notifications: rows,
        pagination: {
          page,
          limit,
          total: count,
        },
      });
    } catch (error) {
      return reject(error);
    }
  });
