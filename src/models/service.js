"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.belongsTo(models.Category, {
        as: "category",
        foreignKey: "category_id",
      });
      Service.belongsToMany(models.User, {
        through: models.StaffService,
        foreignKey: "service_id",
        as: "staffs",
      });
      Service.belongsTo(models.User, {
        as: "creator",
        foreignKey: "created_by",
      });
      // define association here
    }
  }
  Service.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      duration_minutes: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(12, 0),
      category_id: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
