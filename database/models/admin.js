const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.init({
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        userType: {
          type: DataTypes.STRING,
          allowNull: false
        },
      }, {
        sequelize,
        modelName: 'Admin',
      });
    }
  }
 return Admin;
};
