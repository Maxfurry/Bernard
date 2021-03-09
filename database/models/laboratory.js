const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Laboratory extends Model {
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
            this.belongsTo(models.Admission, {
                foreignKey: 'admissionId',
                as: 'admission_details'
            });
        }
    }

    Laboratory.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false
        },
        testValue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        testName: {
            type: DataTypes.STRING,
            allowNull: false
          },
        comment: DataTypes.STRING
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Laboratory',
    });
    return Laboratory;
};
