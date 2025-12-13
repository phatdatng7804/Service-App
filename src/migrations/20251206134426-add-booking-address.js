"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Bookings", "booking_type", {
      type: Sequelize.ENUM("at_store", "at_home"),
      allowNull: false,
      defaultValue: "at_store",
    }),
      await queryInterface.addColumn("Bookings", "address_text", {
        type: Sequelize.STRING,
        allowNull: true,
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Bookings", "address_text");
    await queryInterface.removeColumn("Bookings", "booking_type");
  },
};
