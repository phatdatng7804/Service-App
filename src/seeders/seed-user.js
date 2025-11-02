"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = (password) =>
      bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await queryInterface.bulkInsert(
      "users",
      [
        {
          full_name: "Admin System",
          email: "admin@example.com",
          phone_number: "0769394522",
          password_hash: hashPassword("123456"),
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
