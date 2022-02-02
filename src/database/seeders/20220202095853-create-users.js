'use strict';

const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const defaultPassword = 'Password@123'
    const salt = await bcrypt.genSalt(10)

    let data = [];
    let amount = 10;
    
    while (amount--) {
      data.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.name.firstName(),
        password: await bcrypt.hash(defaultPassword, salt),
        emailVerifiedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Users', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};
