"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "customer",
      });
      Booking.belongsTo(models.Service, {
        foreignKey: "service_id",
        as: "service",
      });
      Booking.belongsTo(models.User, { foreignKey: "staff_id", as: "staff" });
    }
  }
  Booking.init(
    {
      service_id: {
        type: DataTypes.INTEGER,
        field: "service_id",
      },
      user_id: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      number_phone: DataTypes.STRING,
      staff_id: {
        type: DataTypes.INTEGER,
        field: "staff_id",
      },
      booking_date: DataTypes.DATE,
      start_time: DataTypes.TIME,
      end_time: {
        type: DataTypes.TIME,
        field: "time_end",
      },
      status: DataTypes.ENUM("pending", "confirmed", "completed", "canceled"),
      note: DataTypes.TEXT,
      total_price: DataTypes.DECIMAL(12, 0),
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
