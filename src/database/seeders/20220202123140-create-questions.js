'use strict';

const faker = require('faker');

module.exports = {
  async up (queryInterface, Sequelize) {

    let data = [];

    const userIds = await queryInterface.sequelize.query(
      'SELECT id from Users;'
   );

   userIds[0].forEach(userId => {
      data.push({
        title: "How to create database in sql",
        slug: "How-to-create-database-in-sql",
        body: faker.lorem.paragraph(),
        isAnswered:false,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: userId.id
    });
 
   });
    
    await queryInterface.bulkInsert('Questions',data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});

  }
};
