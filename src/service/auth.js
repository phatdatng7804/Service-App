import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTPMail } from "../utils/sendmail";
import { numberPhone } from "../helper/joi_schema";
const User = db.User;
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
export const register = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const { full_name, email, numberPhone, password } = body;
      const exists = await User.findOne({
        where: { phone_number: numberPhone },
      });
      if (exists) {
        return resolve({
          err: 1,
          mes: "Phone number already exists",
        });
      }
      const otp = generateOTP();
      // mã tồn tại trong 3p
      const otpExpires = new Date(Date.now() + 3 * 60 * 1000);

      const user = await User.create({
        full_name,
        email,
        phone_number: numberPhone,
        password_hash: hashPassword(password),
        role_id: 3,
        is_active: false,
        otp_code: otp,
        otp_expires: otpExpires,
      });
      await sendOTPMail(email, otp);
      resolve({
        err: user ? 0 : 1,
        mes: "Register success. Please check email for OTP verification.",
      });
    } catch (error) {
      reject(error);
    }
  });
export const verifyOTP = (numberPhone, otp) => {
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        where: { phone_number: numberPhone },
      });
      if (!user) {
        return resolve({ err: 1, mes: "User not found" });
      }
      if (user.otp_code !== otp) {
        return resolve({ err: 1, mes: "Invalid OTP" });
      }
      if (user.otp_expires < new Date()) {
        return resolve({ err: 1, mes: "OTP expired" });
      }
      user.is_active = true;
      user.otp_code = null;
      user.otp_expires = null;
      await user.save();

      resolve({
        err: 0,
        mes: "Verify success. You can login now.",
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const login = (numberPhone, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { phone_number: numberPhone },
      });
      if (!user) {
        return resolve({
          err: 1,
          mes: "Number phone is not registered",
          access_token: null,
        });
      }
      if (!user.is_active) {
        return resolve({
          err: 1,
          mes: "Account is not active",
          access_token: null,
        });
      }
      const isMatch = bcrypt.compareSync(password, user.password_hash);
      if (!isMatch) {
        return resolve({ err: 1, mes: "Wrong password", access_token: null });
      }
      const token = jwt.sign(
        {
          id: user.id,
          numberPhone: user.phone_number,
          roleId: user.role_id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "4d" }
      );
      resolve({
        err: 0,
        mes: "Login success",
        access_token: `Bearer ${token}`,
      });
    } catch (error) {
      reject(error);
    }
  });
