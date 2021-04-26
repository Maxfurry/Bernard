const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Patient, {
        foreignKey: 'userId',
        as: 'patient',
        onDelete: 'CASCADE',
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    userType: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
