const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const { Patient: patientModel, User: userModel, Admission: admissionModel } = require('../database/models');

class Patient {
  static async create(field = {}, transaction = {}) {
    const { email, password } = field;

     //  hash the incoming password
     const saltRounds = 10;
     const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const user = await userModel.create(
      {
        email,
        password: hashedPassword,
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

  static async updatePatientRecord(field = {}, previous_record = {}, transaction = {}) {
    const firstName = field.firstName || previous_record.firstName;
    const lastName = field.lastName || previous_record.lastName;
    const dateOfBirth = field.dateOfBirth || previous_record.dateOfBirth;
    const gender = field.gender || previous_record.gender;
    const phoneNumber = field.phoneNumber || previous_record.phoneNumber;
    const height = field.height || previous_record.height;
    const weight = field.weight || previous_record.weight;
    const bloodGroup = field.bloodGroup || previous_record.bloodGroup;
    const genotype = field.genotype || previous_record.genotype;
    const occupation = field.occupation || previous_record.occupation;

    return await patientModel.update(
      {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phoneNumber,
        height,
        weight,
        bloodGroup,
        genotype,
        occupation
      },
      {
        where: { id: previous_record.id }, returning: true
      },
      transaction
    );
  }
}

module.exports = Patient;
