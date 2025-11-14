import https from "https";

const ACCESS_TOKEN = process.env.SPEEDSMS_TOKEN;
const SMS_TYPE = {
  QC: 1,
  CSKH: 2,
  OTP: 3,
};
/**
 * Gửi SMS qua SpeedSMS
 * @param {string} phones Số điện thoại nhận, cách nhau bởi dấu phẩy
 * @param {string} content Nội dung tin nhắn
 * @param {number} type Loại tin nhắn (1: QC, 2: CSKH , 3: OTP)
 * @param {string} sender Tên người gửi (tối đa 11 ký tự, để trống nếu không cần thiết)
 * @returns Promise<{err: number, mes: string,data?: object}>
 */

const sendSMS = (phones, content, type = SMS_TYPE.OTP, sender = "") =>
  new Promise((resolve, reject) => {
    const params = JSON.stringify({
      to: phones,
      content,
      sms_type: type,
      sender,
    });

    const auth = "Basic " + Buffer.from(ACCESS_TOKEN + ":x").toString("base64");

    const options = {
      hostname: "api.speedsms.vn",
      port: 443,
      path: "/index.php/sms/send",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    };

    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          if (json.status === "success") {
            console.log("SMS sent:", json);
            resolve({ err: 0, mes: "SMS sent successfully", data: json });
          } else {
            console.error("SMS failed:", json);
            resolve({ err: 1, mes: json.message || "SMS failed", data: json });
          }
        } catch (e) {
          console.error("SMS parse error:", e);
          reject(e);
        }
      });
    });

    req.on("error", (e) => {
      console.error("SMS request error:", e.message);
      reject(e);
    });

    req.write(params);
    req.end();
  });

/** Gửi tin nhắn CSKH */
export const sendCSKHSMS = (phones, message, sender = "") =>
  sendSMS(phones, message, SMS_TYPE.OTP, sender);

/** Gửi tin nhắn OTP */
export const sendOTPSMS = (phones, message, sender = "") =>
  sendSMS(phones, message, SMS_TYPE.OTP, sender);
