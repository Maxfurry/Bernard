'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     *
    */

   return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(async ()=> {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync('admin', saltRounds); // <<<---- TYPE THE PASSWORD HERE

    return await queryInterface.bulkInsert('Employee', [{
       id: Sequelize.literal('uuid_generate_v4()'),
       email: 'admin@admin.com',
       password: hashedPassword, //NOTE: this password should be in .env file
       role: 'ADMIN',
       createdAt: new Date(),
       updatedAt:  new Date()
     }], {});
  });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Employee', [{
      email :'test@gmail.com'
    }])
  }
};
