import db from "../models";
const Notification = db.Notification;

export const createNotification = async ({
  user_id,
  title,
  body,
  type,
  booking_id,
  data,
}) => {
  return await Notification.create({
    user_id,
    title,
    body,
    type,
    booking_id: booking_id || null,
    data: data || null,
  });
};
