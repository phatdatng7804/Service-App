"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookingCancel extends Model {
    static associate(models) {
      BookingCancel.belongsTo(models.Booking, {
        foreignKey: "booking_id",
        as: "booking",
      });
      BookingCancel.belongsTo(models.User, {
        foreignKey: "cancel_by",
        as: "canceler",
      });
    }
  }
  BookingCancel.init(
    {
      cancel_note: DataTypes.TEXT,
      cancelled_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "BookingCancel",
      tableName: "BookingCancels",
      timestamps: false,
    }
  );
  return BookingCancel;
};
