const {
    Model
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class Invoice extends Model {
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
        this.hasMany(models.InvoiceItem,{
          foreignKey: "invoiceId",
          as: "items"
        })
      }
    }
  
    Invoice.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      series: {
        type: DataTypes.STRING,
      },
      No: {
        type: DataTypes.STRING,
      },
      date: DataTypes.DATE
    }, {
      sequelize,
      freezeTableName: true,
      modelName: 'Invoice',
    });
    return Invoice;
  };
  