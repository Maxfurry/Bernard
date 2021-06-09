const {
    Model
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class Receipt extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        this.belongsTo(models.Patient, {
            foreignKey: 'patientId',
            as: 'patient_details'
        });

         this.hasMany(models.ReceiptItem,{
          foreignKey: "receiptId",
          as: "items"
        })
      }
    }
  
    Receipt.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      amount: {
        type: DataTypes.STRING,
      },
      paymentMode: {
        type: DataTypes.STRING,
      },
      date: DataTypes.DATE,
      No: DataTypes.STRING,
      series: DataTypes.STRING
    }, {
      sequelize,
      freezeTableName: true,
      modelName: 'Receipt',
    });
    return Receipt;
  };
  