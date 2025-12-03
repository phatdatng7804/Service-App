"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "avatar", {
      type: Sequelize.STRING,
      allowNull: true, // cho phép null
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Users", "avatar");
  },
};
