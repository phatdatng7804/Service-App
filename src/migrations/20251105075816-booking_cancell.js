"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BookingCancels", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Bookings", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      cancel_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      cancel_note: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cancelled_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BookingCancels");
  },
};
