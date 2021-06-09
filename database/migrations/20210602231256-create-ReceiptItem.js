module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ReceiptItem', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      price: {
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
      receiptId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'Receipt',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ReceiptItem');
  }
};
