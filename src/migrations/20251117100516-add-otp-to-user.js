"use strict";

const { toggleUserSchema } = require("../helper/joi_adminUser");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "otp_code", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Users", "otp_expires", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn("Users", "is_active", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "otp_code");
    await queryInterface.removeColumn("Users", "otp_expires");
  },
};
