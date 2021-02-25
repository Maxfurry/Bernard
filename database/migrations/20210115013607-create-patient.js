module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      bloodGroup: {
        type: Sequelize.STRING
      },
      genotype: {
        type: Sequelize.STRING
      },
      occupation: {
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
      userId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Patients');
  }
};
