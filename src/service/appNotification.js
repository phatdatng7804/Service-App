import { sendNotificationToUser } from "./firebase";
import { createNotification } from "./notification";
export const notifyBookingCreated = (userId, booking) =>
  new Promise(async (resolve, reject) => {
    try {
      const title = "Đặt lịch thành công!";
      const body = `Đơn #${booking.id} đã được tạo và đang chờ xác nhận.`;
      const type = "booking_created";
      const data = {
        type,
        bookingId: String(booking.id),
      };
      const rs = await sendNotificationToUser(userId, title, body, data);
      await createNotification({
        user_id: userId,
        title,
        body,
        type,
        booking_id: booking.id,
        data,
      });
      return resolve(rs);
    } catch (error) {
      return reject(error);
    }
  });

export const notifyBookingConfirmed = (userId, booking, provider) =>
  new Promise(async (resolve, reject) => {
    try {
      const type = "booking_confirmed";
      const title = `Đơn #${booking.id} đã được xác nhận`;
      const body = `Vui lòng đến đúng ${booking.time}`;
      const data = {
        type,
        bookingId: String(booking.id),
      };
      const rs = await sendNotificationToUser(userId, title, body, data);
      await createNotification({
        userId,
        title,
        body,
        type,
        booking,
        extraData: {},
      });
      return resolve(rs);
    } catch (error) {
      return reject(error);
    }
  });

export const notifyBookingIncoming = (userId, booking, provider) =>
  new Promise(async (resolve, reject) => {
    try {
      const type = "booking_incoming";
      const title = "Thợ đang trên đường đến";
      const body = `${
        provider?.full_name || "Thợ"
      } đang di chuyển đến địa chỉ của bạn.`;
      const data = {
        type,
        bookingId: String(booking.id),
      };
      const rs = await sendNotificationToUser({ userId, title, body, data });
      await createNotification({ userId, title, body, type, booking });
      return resolve(rs);
    } catch (error) {
      return reject(error);
    }
  });

export const notifyBookingCompleted = (userId, booking) =>
  new Promise(async (resolve, reject) => {
    try {
      const type = "booking_completed";
      const title = `Đơn #${booking.id} đã hoàn thành`;
      const body = "Vui lòng đánh giá chất lượng dịch vụ.";
      const data = {
        type,
        bookingId: String(booking.id),
      };
      const rs = await sendNotificationToUser(userId, title, body, data);
      await createNotification({ userId, title, body, type, booking });
      return resolve(rs);
    } catch (error) {
      return reject(error);
    }
  });

// 5. Huỷ đơn
export const notifyBookingCanceled = (userId, booking, reason = "") =>
  new Promise(async (resolve, reject) => {
    try {
      const type = "booking_canceled";
      const title = `Đơn #${booking.id} đã bị hủy`;
      const body = reason || "Vui lòng xem chi tiết đơn.";
      const data = {
        type,
        bookingId: String(booking.id),
      };
      const rs = await sendNotificationToUser(userId, title, body, data);
      await createNotification({
        userId,
        title,
        body,
        type,
        booking,
        extraData: { reason },
      });
      return resolve(rs);
    } catch (error) {
      return reject(error);
    }
  });

// 6. Nhắc lịch
export const notifyBookingReminder = (userId, booking) =>
  new Promise(async (resolve, reject) => {
    try {
      const type = "booking_reminder";
      const title = "Nhắc lịch dịch vụ";
      const body = `Bạn có lịch đơn #${booking.id} lúc ${booking.time}`;
      const data = {
        type,
        bookingId: String(booking.id),
      };
      const rs = await sendNotificationToUser(userId, title, body, data);
      await createNotification({ userId, title, body, type, booking });
      return resolve(rs);
    } catch (error) {
      return reject(error);
    }
  });
