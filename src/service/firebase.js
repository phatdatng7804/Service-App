import { Expo } from "expo-server-sdk";
import db from "../models";

const expo = new Expo();
const DeviceToken = db.DeviceToken;
export const registerDeviceToken = async ({
  user_id,
  fcm_token,
  platform,
  device_id,
}) => {
  if (!fcm_token) {
    throw new Error("Missing fcm_token (Expo push token)");
  }
  const [record, created] = await DeviceToken.findOrCreate({
    where: {
      user_id,
      device_id: device_id || null,
    },
    defaults: {
      fcm_token: fcm_token,
      platform: platform || "unknown",
    },
  });
  if (!created) {
    record.fcm_token = fcm_token;
    if (platform) record.platform = platform;
    await record.save();
  }
  return record;
};

export const sendNotificationToUser = (userId, title, body, data = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const tokens = await DeviceToken.findAll({ where: { user_id: userId } });
      if (!tokens.length) {
        console.log("No device tokens for user:", userId);
        return resolve({
          err: 1,
          mes: "No device tokens found ",
          successCount: 0,
        });
      }
      const registrationTokens = tokens
        .map((t) => t.fcm_token)
        .filter((t) => !!t);
      if (!registrationTokens.length) {
        console.log("No non-empty tokens for user:", userId);
        return resolve({
          err: 1,
          mes: "No non-empty device tokens found",
          successCount: 0,
        });
      }
      const expoTokens = registrationTokens.filter((token) =>
        Expo.isExpoPushToken(token)
      );
      const messages = expoTokens.map((token) => ({
        to: token,
        sound: "default",
        title,
        body,
        data: Object.fromEntries(
          Object.entries(data).map(([k, v]) => [k, String(v)])
        ),
      }));
      const chunks = expo.chunkPushNotifications(messages);
      const tickets = [];
      let successCount = 0;
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);

          successCount += ticketChunk.filter((t) => t.status === "ok").length;
        } catch (err) {
          console.error("Error sending Expo push chunk:", err);
        }
      }
      console.log(
        `Expo Push: sent ${successCount}/${expoTokens.length} success`
      );
      return resolve({
        err: 0,
        mes: "Notification sent",
        successCount,
        tickets,
      });
    } catch (error) {
      reject(error);
    }
  });
