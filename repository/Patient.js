const { Op } = require('sequelize');
const { Patient: patientModel, User: userModel, Admission: admissionModel } = require('../database/models');

class Patient {
  static async create(field = {}, transaction = {}) {
    const { email, password } = field;
    const user = await userModel.create(
      {
        email,
        password,
        userType: 'Patient',
      },
      transaction
    );

    return patientModel.create(
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
    return patientModel.findOne(
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
    );
  }

   /**
   * @description This controller is used to get a patient by their Id
  */
 static async getPatientByEmail(field = {}, transaction = {}) {
  const { email } = field;
  return userModel.findOne(
    {
      where: {
        email
      },
    }, transaction
  );
}

  static async searchForPatient(name = '', transaction = {}) {
    return patientModel.findAll({
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
          model: userModel,
          as: 'login_details',
          attributes: ['email']
        }
      ]
    }, transaction);
  }

  static async getAllPatient(query, transaction = {}) {
    return patientModel.findAll({
      limit: query.count,
      offset: query.start,
      include: [
        {
          model: userModel,
          as: 'login_details',
          attributes: {
            exclude: ['password']
          }
        }
      ]
    }, transaction);
  }

  static async getAllAdmissionRecordForAPatient(req, { start, count }, transaction = {}) {
    return admissionModel.findAll({
      limit: count,
      offset: start,
      where: {
        patientId: req.patientId
      },
    }, transaction);
  }
}

module.exports = Patient;
