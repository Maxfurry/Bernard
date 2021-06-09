const {
    Model
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class InvoiceItem extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        this.belongsTo(models.Invoice, {
            foreignKey: 'invoiceId',
            as: 'invoice_details'
        });

      }
    }
  
    InvoiceItem.init({
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
      modelName: 'InvoiceItem',
    });
    return InvoiceItem;
  };
  