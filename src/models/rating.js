"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "customer",
      });
      Rating.belongsTo(models.User, {
        foreignKey: "staff_id",
        as: "staff",
      });
      Rating.belongsTo(models.Service, {
        foreignKey: "service_id",
        as: "service",
      });
      Rating.belongsTo(models.Booking, {
        foreignKey: "booking_id",
        as: "booking",
      });
    }
  }
  Rating.init(
    {
      service_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      staff_id: DataTypes.INTEGER,
      booking_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Rating",
      timestamps: false,
    }
  );
  return Rating;
};
