const { Patient: patientModel, Laboratory } = require('../database/models');

class Patient {
  static async createPatientLabReport(field = {}, transaction = {}) {
    return Laboratory.create(field, transaction);
  }

  /**
   * @description This controller is used to get a patient by their Id
  */
  static async getPatientLabReport(field = {}, transaction = {}) {
    const { id } = field;
    return Laboratory.findOne(
      {
        where: {
          id
        },
        include: [
          {
            model: patientModel,
            as: 'patient_details'
          }
        ]
      }, transaction
    );
  }

  static async getAllLabReportForAPatient(field = {}, transaction = {}) {
    const { patientId } = field;
    return Laboratory.findAll(
      {
        where: {
          patientId
        },
        include: [
          {
            model: patientModel,
            as: 'patient_details'
          }
        ]
      }, transaction
    );
  }

  static async updatePatientLabReport(field = {}, previous_record = {}, transaction = {}) {
    const testName = field.testName || previous_record.testName;
    const isActive = field.isActive || previous_record.isActive;
    const testValue = field.testValue || previous_record.testValue;
    const minValue = field.minValue || previous_record.minValue;
    const maxValue = field.maxValue || previous_record.maxValue;
    const calUnit = field.calUnit || previous_record.calUnit;
    const comment = field.comment || previous_record.comment;

    return await Laboratory.update(
      {
        testName,
        isActive,
        testValue,
        minValue,
        maxValue,
        calUnit,
        comment
      },
      {
        where: { id: previous_record.id }, returning: true
      },
      transaction
    );
  }
}

module.exports = Patient;
