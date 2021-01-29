const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admission extends Model {
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
  Admission.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    admittedOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dischargedOn: DataTypes.DATE,
    roomNumber: DataTypes.STRING,
    bedNumber: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Admission',
  });
  return Admission;
};
