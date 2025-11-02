"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "is_active", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      after: "role_id",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "is_active");
  },
};
