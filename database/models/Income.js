const {
    Model
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class Income extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {

      }
    }
  
    Income.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      incomeHead: {
        type: DataTypes.STRING,
      },
      invoiceNumber: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.STRING,
      },
      document: {
        type: DataTypes.STRING,
      },
      date: DataTypes.DATE
    }, {
      sequelize,
      freezeTableName: true,
      modelName: 'Income',
    });
    return Income;
  };
  