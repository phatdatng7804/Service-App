import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { raw } from "mysql2";

const hassPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const register = (numberPhone, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { phone_number: numberPhone },
        defaults: {
          phone_number: numberPhone,
          password_hash: hassPassword(password),
        },
      });
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              numberPhone: response[0].phone_number,
              roleId: response[0].role_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          )
        : null;
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Register success" : "Number phone already exists",
        "access token": token ? `Bearer ${token}` : null,
      });
    } catch (error) {
      reject(error);
    }
  });
export const login = (numberPhone, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { phone_number: numberPhone },
        raw: true,
      });
      const checkPassword =
        response && bcrypt.compareSync(password, response.password_hash);
      const token = checkPassword
        ? jwt.sign(
            {
              id: response.id,
              numberPhone: response.phone_number,
              roleId: response.role_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          )
        : null;
      resolve({
        err: token ? 0 : 1,
        mes: token
          ? "Login success"
          : checkPassword
          ? "Password is wrong"
          : "Number phone is not registered",
        "access token": token ? `Bearer ${token}` : null,
      });
    } catch (error) {
      reject(error);
    }
  });
