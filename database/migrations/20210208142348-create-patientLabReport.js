'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PatientLabReport', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      testName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.STRING,
      },
      testValue: {
        type: Sequelize.STRING,
        allowNull: false
      },
       minValue: {
        type: Sequelize.STRING,
      },
      maxValue: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      calUnit: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      patientId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'Patients',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PatientLabReport');
  }
};
