import db from "../models";
import cloudinary from "../config/cloudinary";
const User = db.User;

export const uploadUser = (id, file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(id);
      if (!user) return resolve({ err: 1, mes: "User not found" });
      if (!file) return resolve({ err: 1, mes: "No file uploaded" });

      const uploadCloud = () =>
        new Promise((res, rej) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "user_avatars",
              transformation: [{ width: 500, height: 500, crop: "fill" }],
            },
            (error, result) => {
              if (error) return rej(error);
              res(result);
            }
          );
          stream.end(file.buffer);
        });
      const result = await uploadCloud();
      user.avatar = result.secure_url;
      await user.save();
      return resolve({
        err: 0,
        mes: "Upload successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const updateUserInfo = (id, data, file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(id);
      if (!user) return resolve({ err: 1, mes: "User not found" });

      const allowedFields = ["full_name", "gender"];
      allowedFields.forEach((field) => {
        if (data[field] !== undefined) {
          user[field] = data[field];
        }
      });
      if (file) {
        const uploadCloud = () =>
          new Promise((res, rej) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: "avatars",
                transformation: [{ width: 400, height: 400, crop: "fill" }],
              },
              (err, result) => {
                if (err) rej(err);
                else res(result);
              }
            );

            stream.end(file.buffer);
          });

        const result = await uploadCloud();
        user.avatar = result.secure_url;
      }
      await user.save();
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
