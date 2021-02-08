const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PatientLabReport extends Model {
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

    PatientLabReport.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        testName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.STRING,
            defaultValue: 'true'
        },
        testValue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        minValue: DataTypes.STRING,
        maxValue: DataTypes.STRING,
        calUnit: DataTypes.STRING,
        comment: DataTypes.STRING
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'PatientLabReport',
    });
    return PatientLabReport;
};
