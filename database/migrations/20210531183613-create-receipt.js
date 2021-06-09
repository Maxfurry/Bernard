module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Receipt', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      amount: {
        type: Sequelize.STRING
      },
      paymentMode: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      series:  {
        type: Sequelize.STRING
      },
      No:  {
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
    await queryInterface.dropTable('Receipt');
  }
};
