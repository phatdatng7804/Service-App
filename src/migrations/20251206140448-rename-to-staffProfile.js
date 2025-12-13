"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable("StaffServices", "StaffProfiles");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable("StaffProfiles", "StaffServices");
  },
};
