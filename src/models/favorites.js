"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Favorite.belongsTo(models.Service, {
        foreignKey: "service_id",
        as: "service",
      });
    }
  }
  Favorite.init(
    {
      user_id: DataTypes.INTEGER,
      service_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Favorite",
      timestamps: false,
    }
  );
  return Favorite;
};
