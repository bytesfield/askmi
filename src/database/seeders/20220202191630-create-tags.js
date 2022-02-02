'use strict';

const faker = require('faker');

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Tags', [
       {
        name: "javascript",
        description: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "php",
        description: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "typescript",
        description: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "java",
        description: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Tags', null, {});
  }
};
