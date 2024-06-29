'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "todobacks",
      Array.from({ length: 10 }).map((_, i) => ({
        name: `todo-${i}`,
        content: `This is todo-${i}'s content`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todobacks', null)
  }
};
