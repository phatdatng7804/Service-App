"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StaffService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StaffService.belongsTo(models.User, {
        foreignKey: "staff_id",
        as: "staff",
      });
      StaffService.belongsTo(models.Service, {
        foreignKey: "service_id",
        as: "service",
      });
    }
  }
  StaffService.init(
    {
      exprerience_year: { type: DataTypes.INTEGER, defaultValue: 0 },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: "StaffService",
    }
  );
  return StaffService;
};
