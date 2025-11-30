"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeviceToken extends Model {
    static associate(models) {
      DeviceToken.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }
  DeviceToken.init(
    {
      user_id: DataTypes.INTEGER,
      fcm_token: DataTypes.STRING,
      platform: DataTypes.STRING,
      device_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DeviceToken",
      timestamps: true,
    }
  );
  return DeviceToken;
};
