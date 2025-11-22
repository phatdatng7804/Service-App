"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PasswordResetOtp extends Model {
    static associate(models) {
      // Mối quan hệ: Một record OTP thuộc về 1 user
      PasswordResetOtp.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  PasswordResetOtp.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      otp_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PasswordResetOtp",
      tableName: "PasswordResetOtps", // đúng tên bạn đặt trong migration
    }
  );

  return PasswordResetOtp;
};
