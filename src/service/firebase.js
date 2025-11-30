import admin from "../config/firebase";
import db from "../models";

const DeviceToken = db.DeviceToken;

export const sendNotificationToUser = (userId, title, body, data = {}) => {
  new Promise(async (resolve, reject) => {
    try {
      const tokens = await DeviceToken.findAll({ where: { user_id: userId } });
      if (!tokens.length) {
        console.log("No FCM tokens for user:", userId);
        return resolve({
          err: 1,
          mes: "No device tokens found ",
          successCount: 0,
        });
      }
      const registrationTokens = tokens.map((t) => t.fcm_token);
      const message = {
        notification: { title, body },
        data: Object.fromEntries(
          Object.entries(data).map(([k, v]) => [k, String(v)])
        ),
        tokens: registrationTokens,
      };

      const response = await admin.messaging().sendMulticast(message);

      console.log(
        `FCM: sent ${response.successCount}/${tokens.length} success`
      );
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          const error = resp.error;

          if (error.code === "messaging/registration-token-not-registered") {
            db.DeviceToken.destroy({
              where: { fcm_token: registrationTokens[idx] },
            }).catch((e) =>
              console.error("Failed to delete dead token:", e.message)
            );
          }
        }
      });

      return resolve({
        err: 0,
        mes: "Notification sent",
        successCount: response.successCount,
        responses: response.responses,
      });
    } catch (error) {
      reject(error);
    }
  });
};
