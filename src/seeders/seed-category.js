"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Cắt tóc nam",
          description: "Dịch vụ cắt, gội, tạo kiểu tóc cho nam giới",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Làm móng",
          description: "Dịch vụ chăm sóc và trang trí móng tay, móng chân",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Massage thư giãn",
          description:
            "Giúp giảm căng thẳng, mệt mỏi và cải thiện tuần hoàn máu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chăm sóc da mặt",
          description: "Làm sạch sâu, dưỡng ẩm và phục hồi làn da khỏe mạnh",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Trang điểm",
          description: "Dịch vụ make-up cho tiệc, chụp hình, cưới hỏi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
