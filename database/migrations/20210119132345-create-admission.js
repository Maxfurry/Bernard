module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Admissions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      admittedOn: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.UUIDV4
      },
      dischargedOn: {
        type: Sequelize.DATE,
      },
      roomNumber: {
        type: Sequelize.STRING
      },
      bedNumber: {
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
    await queryInterface.dropTable('Admissions');
  }
};
