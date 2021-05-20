module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Timelines', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      description: {
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('Timelines');
  }
};
