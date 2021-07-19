'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Expenses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      expensesHead: {
        type: Sequelize.STRING
      },
      invoiceNumber: {
        type: Sequelize.STRING
      },
      amount:  {
        type: Sequelize.STRING
      },
      document:  {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Expenses');
  }
};

