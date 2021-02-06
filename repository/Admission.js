const { Admission: admissionModel, Patient: patientModel } = require('../database/models');

class Addmission {
  static async create(field = {}, transaction = {}) {
    const {
      admittedOn, dischargedOn, roomNumber, bedNumber, patientId
    } = field;
    return await admissionModel.create(
      {
        patientId,
        admittedOn,
        dischargedOn,
        roomNumber,
        bedNumber
      },
      transaction
    );
  }

  static async updateAdmissionRecord(field = {}, previous_record = {}, transaction = {}) {
    const admittedOn = field.admittedOn || previous_record.admittedOn;
    const dischargedOn = field.dischargedOn || previous_record.dischargedOn;
    const roomNumber = field.roomNumber || previous_record.roomNumber;
    const bedNumber = field.bedNumber || previous_record.bedNumber;

    return await admissionModel.update(
      {
        admittedOn,
        dischargedOn,
        roomNumber,
        bedNumber
      },
      {
        where: { id: previous_record.id }, returning: true
      },
      transaction
    );
  }

  static async deleteAdmissionRecord(field = {}, transaction = {}) {
    return await admissionModel.destroy(
      { returning: true, where: { id: field.recordId } },
      transaction
    );
  }

  static async getAdmissionRecord(field = {}, transaction = {}) {
    const { recordId } = field;
    return admissionModel.findOne(
      {
        where: {
          patientId: recordId
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
}

module.exports = Addmission;
