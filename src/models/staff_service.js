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
    }
  }
  StaffService.init(
    {
      staff_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      experience_years: { type: DataTypes.INTEGER, defaultValue: 0 },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
      store_name: DataTypes.STRING,
      store_address: DataTypes.STRING,
      store_lat: DataTypes.DECIMAL(10, 7),
      store_lng: DataTypes.DECIMAL(10, 7),
      bio: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "StaffService",
      tableName: "StaffProfiles",
      freezeTableName: true,
    }
  );
  return StaffService;
};
