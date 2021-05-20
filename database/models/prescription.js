const {
    Model
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class Prescription extends Model {
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
      }
    }
    Prescription.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
          },
          drugName: {
            allowNull: false,
            type: DataTypes.STRING
          },
          dosage: {
            allowNull: false,
            type: DataTypes.STRING
          },
          drugType: {
            allowNull: false,
            type: DataTypes.STRING
          },
          startDate: {
            type: DataTypes.DATE
          },
          period: {
            type: DataTypes.STRING
          },
          note: {
            type: DataTypes.STRING
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
    }, {
      sequelize,
      modelName: 'Prescriptions',
    });
    return Prescription;
  };
  