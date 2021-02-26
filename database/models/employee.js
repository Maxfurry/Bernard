const {
    Model
  } = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        this.hasOne(models.EmployeeDetails, {
            foreignKey: 'employeeId',
            as: 'employeeDetails',
            onDelete: 'CASCADE',
          });
      }
    }
    Employee.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      email:{
        type:  DataTypes.STRING,
        allowNull: false
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
      }
    }, {
      sequelize,
      freezeTableName: true,
      modelName: 'Employee',
    });
    return Employee;
  };
  