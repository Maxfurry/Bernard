const {
    Model
  } = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
    class EmployeeDetails extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        this.belongsTo(models.Employee, {
            foreignKey: 'employeeId',
            as: 'employeeDetails',
          });
      }
    }
    EmployeeDetails.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      firstname:{
        type:  DataTypes.STRING,
        allowNull: false
      },
      lastname:{
        type: DataTypes.STRING,
        allowNull: false
      },
      dateOfBirth: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
    }, {
      sequelize,
      modelName: 'EmployeeDetails',
    });
    return EmployeeDetails;
  };
  