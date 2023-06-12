'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'John Doe',
      password: hashPassword('hacktiv123'),
      email:'john@gmail.com',
      role:'Admin',
      createdAt:new Date(),
      updatedAt:new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Users', null, {});
  }
};
