const {
    Model
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class ReceiptItem extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        this.belongsTo(models.Receipt, {
            foreignKey: 'receiptId',
            as: 'receipt_details'
        });
      }
    }
  
    ReceiptItem.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      quantity: DataTypes.STRING,
      price: DataTypes.STRING
    }, {
      sequelize,
      freezeTableName: true,
      modelName: 'ReceiptItem',
    });
    return ReceiptItem;
  };
  