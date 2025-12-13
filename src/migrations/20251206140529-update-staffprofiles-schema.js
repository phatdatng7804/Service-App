"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("StaffProfiles", "service_id");
    await queryInterface.addColumn("StaffProfiles", "store_name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("StaffProfiles", "store_address", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("StaffProfiles", "store_lat", {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
    });
    await queryInterface.addColumn("StaffProfiles", "store_lng", {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
    });
    await queryInterface.addColumn("StaffProfiles", "bio", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("StaffProfiles", "bio");
    await queryInterface.removeColumn("StaffProfiles", "store_lng");
    await queryInterface.removeColumn("StaffProfiles", "store_lat");
    await queryInterface.removeColumn("StaffProfiles", "store_address");
    await queryInterface.removeColumn("StaffProfiles", "store_name");

    await queryInterface.addColumn("StaffProfiles", "service_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
