'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Laboratory', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      result: {
        type: Sequelize.STRING,
        allowNull: false
      },
      testValue: {
        type: Sequelize.STRING,
        allowNull: false
      },
      testName: {
        type: Sequelize.STRING,
         allowNull: false
      },
      comment: Sequelize.STRING,
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
      admissionId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'Admissions',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Laboratory');
  }
};
