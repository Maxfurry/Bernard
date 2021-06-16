const {
    Model
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class Timeline extends Model {
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
    Timeline.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
          },
          title: {
            allowNull: false,
            type: DataTypes.STRING
          },
          date: {
            allowNull: false,
            type: DataTypes.STRING
          },
          document: {
            type: DataTypes.STRING
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
    }, {
      sequelize,
      modelName: 'Timelines',
    });
    return Timeline;
  };
  