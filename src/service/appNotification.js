import { sendNotificationToUser } from "./firebase";

export const notifyBookingCreated = (userId, booking) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await sendNotificationToUser(
        userId,
        "Đặt lịch thành công",
        `Đơn #${booking.id} đã được tạo và đang chờ xác nhận.`,
        {
          type: "booking_created",
          bookingId: String(booking.id),
        }
      );
      return resolve(rs);
    } catch (error) {
      return reject(error);
    }
  });

export const notifyBookingConfirmed = (userId, booking, provider) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await sendNotificationToUser(
        userId,
        `Đơn #${booking.id} đã được xác nhận`,
        `${provider?.full_name || "Thợ"} sẽ đến lúc ${booking.time}.`,
        {
          type: "booking_confirmed",
          bookingId: String(booking.id),
        }
      );
      return resolve(rs);
    } catch (error) {
      return reject(error);
    }
  });

export const notifyBookingIncoming = (userId, booking, provider) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await sendNotificationToUser(
        userId,
        "Thợ đang trên đường",
        `${provider?.full_name || "Thợ"} đang di chuyển tới địa chỉ của bạn.`,
        {
          type: "booking_incoming",
          bookingId: String(booking.id),
        }
      );
      return resolve(rs);
    } catch (error) {
      return reject(error);
    }
  });

export const notifyBookingCompleted = (userId, booking) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await sendNotificationToUser(
        userId,
        `Đơn #${booking.id} đã hoàn thành`,
        "Vui lòng đánh giá chất lượng dịch vụ.",
        {
          type: "booking_completed",
          bookingId: String(booking.id),
        }
      );
      return resolve(rs);
    } catch (error) {
      return reject(error);
    }
  });

// 5. Huỷ đơn
export const notifyBookingCanceled = (userId, booking, reason = "") =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await sendNotificationToUser(
        userId,
        `Đơn #${booking.id} đã bị huỷ`,
        reason || "Vui lòng xem chi tiết đơn hàng.",
        {
          type: "booking_canceled",
          bookingId: String(booking.id),
        }
      );
      return resolve(rs);
    } catch (error) {
      return reject(error);
    }
  });

// 6. Nhắc lịch
export const notifyBookingReminder = (userId, booking) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await sendNotificationToUser(
        userId,
        "Nhắc lịch dịch vụ",
        `Bạn có đơn #${booking.id} lúc ${booking.time}.`,
        {
          type: "booking_reminder",
          bookingId: String(booking.id),
        }
      );
      return resolve(rs);
    } catch (error) {
      return reject(error);
    }
  });
