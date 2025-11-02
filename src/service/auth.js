import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { raw } from "mysql2";
import role from "../models/role";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const register = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const { full_name, email, numberPhone, password } = body;
      const [user, created] = await db.User.findOrCreate({
        where: { phone_number: numberPhone },
        defaults: {
          full_name,
          email,
          phone_number: numberPhone,
          password_hash: hashPassword(password),
          role_id: 3,
        },
      });
      if (!created) {
        return resolve({
          err: 1,
          mes: "Number phone already exists",
          access_token: null,
        });
      }
      const token = created
        ? jwt.sign(
            {
              id: user.id,
              numberPhone: user.phone_number,
              roleId: user.role_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          )
        : null;
      resolve({
        err: created ? 0 : 1,
        mes: created ? "Register success" : "Number phone already exists",
        "access token": token ? `Bearer ${token}` : null,
      });
    } catch (error) {
      reject(error);
    }
  });
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
