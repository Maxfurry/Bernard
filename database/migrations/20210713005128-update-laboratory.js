'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
     await queryInterface.addColumn(
      'Laboratory',
      'document',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    )

    await queryInterface.removeColumn(
      'Laboratory',
      'admissionId'
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await queryInterface.removeColumn(
      'Laboratory',
      'document'
    )
  }
};
