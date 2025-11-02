"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          role: "Admin",
          value: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: "Staff",
          value: "staff",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: "Customer",
          value: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
