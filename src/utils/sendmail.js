import nodemailer from "nodemailer";

export const sendOTPMail = async (toEmail, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Service App <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: "Mã OTP của bạn!Vui lòng không gửi cho ai!",
    html: `
        <h2>Xác minh tài khoản</h2>
        <p>Mã OTP của bạn là:</p>
        <h1 style="color: #2e6cdb;">${otp}</h1>
        <p>Mã này có hiệu lực trong <b>3 phút</b>.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
