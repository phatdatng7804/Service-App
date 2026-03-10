"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Notifications", "updateAt");
    await queryInterface.addColumn("Notifications", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Notifications", "updatedAt");

    await queryInterface.addColumn("Notifications", "updateAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
