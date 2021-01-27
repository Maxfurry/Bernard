const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { Patient: patientModel, User: userModel } = require("../database/models");

class Patient {
  static async create(field = {}, transaction = {}) {
    const { email, password } = field;
    const user = await userModel.create(
      {
        email,
        password,
        userType: "Patient",
      },
      transaction
    );

    return await patientModel.create(
      {
        ...field,
        userId: user.id,
      },
      transaction
    );
  }

  /**
   * @description This controller is used to get a patient by their Id
  */
  static async getPatient(field = {}, transaction = {}) {
    const { id } = field;
    return await patientModel.findOne(
      {
        where: {
          id
        },
        include: [
          {
            model: userModel,
            as: 'login_details',
            attributes: ['email']
          }
        ]
      }, transaction
    )

  }

  static async searchForPatient(name = '', transaction = {}) {

    return await patientModel.findAll({
      where: {
        [Op.or]: {
          firstName: {
            [Op.iLike]: `%${name}%`
          },
          lastName: {
            [Op.iLike]: `%${name}%`
          }
        }
      },
      include: [
        {
          model: userModel, as: 'login_details',
          attributes: ['email']
        }
      ]
    }, transaction);

  }
}

module.exports = Patient;
