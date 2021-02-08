const { RESOURCE_CREATED_CODE, OK_CODE, BAD_REQUEST, NOT_FOUND_CODE } = require('../constants');
const { successResponse, serverFailure, failureResponse } = require('../utils/helperFunction');
const {
  create, getPatient, searchForPatient, updatePatientRecord, getAllPatient, getAllAdmissionRecordForAPatient,
  getPatientByEmail
} = require('../repository/Patient');
const { sequelize } = require('../database/models');
const validateParms = require('../middleware/PatientController.validation');
const { paginationQuery, idValidation } = require('../middleware/generalValidation');

class PatientController {
  static async register(req, res) {
    const validation = validateParms.registerPatient(req.body);
    if (validation.error) return failureResponse(res, validation.error);

    const transaction = await sequelize.transaction();
    try {
      const recordExist = await getPatientByEmail({ email: req.body.email });
      if (recordExist) return failureResponse(res, 'email already exists', NOT_FOUND_CODE);

      const newPatient = await create(req.body, { transaction });
      await transaction.commit();
      return successResponse(
        res,
        'Patient Registration Successfully!',
        RESOURCE_CREATED_CODE,
        newPatient
      );
    } catch (error) {
      console.log("🚀 ~ file: PatientController.js ~ line 30 ~ PatientController ~ register ~ error", error)
      await transaction.rollback();
      return serverFailure(res, 'Could not register patient');
    }
  }

  /**
* @param req.body -  {
    firstName
    lastName
    dateOfBirth
    gender
    phoneNumber
    height
    weight
    bloodGroup
    genotype
* }
* @description update a patient record by patient Id
*/
  static async updatePatientRecord(req, res) {
    const validation = idValidation({ id: req.params.patientId });
    if (validation.error) return failureResponse(res, 'patientId is required or Invalid');

    try {
      const recordExist = await getPatient({ id: req.params.patientId });
      if (!recordExist) return failureResponse(res, 'patient record not found', NOT_FOUND_CODE);

      const updatedPatientRecord = await updatePatientRecord(req.body, recordExist);
      console.log("🚀 ~ file: PatientController.js ~ line 59 ~ PatientController ~ updatePatientRecord ~ updatedPatientRecord", updatedPatientRecord[1].dataValues)
      return successResponse(
        res,
        'Patient Record Updated Successfully!',
        OK_CODE,
        updatedPatientRecord[1].dataValues
      );
    } catch (error) {
      return serverFailure(res, 'Could not update admission record');
    }
  }

  /**
   * @param req.params -  id
   * @description get a patient by Id
   */
  static async getPatientById(req, res) {
    const validation = idValidation(req.params);
    if (validation.error) return failureResponse(res, validation.error);

    try {
      const singlePatient = await getPatient(req.params);

      return successResponse(
        res,
        'Patient details fetched successfully',
        OK_CODE,
        singlePatient
      );
    } catch (error) {
      return serverFailure(res, 'Could not fetch patient');
    }
  }

  /**
 * @param req.query firstname, lastname
 * @description search for a patient by their firstname or lastname
 */
  static async searchForPatient(req, res) {
    const validation = validateParms.searchForPatient(req.query);
    if (validation.error) return failureResponse(res, validation.error, BAD_REQUEST);

    try {
      const singlePatient = await searchForPatient(req.query.name);
      return successResponse(
        res,
        'search results',
        OK_CODE,
        singlePatient
      );
    } catch (error) {
      return serverFailure(res, 'Could not fetch patient');
    }
  }

  /**
* @param req.query -- pagination query (start & count)
* @description get all patients
*/
  static async getAllPatients(req, res) {
    const start = req.query.start || 0;
    const count = req.query.count || 20;
    const validation = paginationQuery({ start, count });
    if (validation.error) return failureResponse(res, validation.error);

    try {
      const allpatients = await getAllPatient({ start, count });
      return successResponse(
        res,
        'fetched all patients successfully',
        OK_CODE,
        allpatients
      );
    } catch (error) {
      return serverFailure(res, 'Could not fetch patient');
    }
  }

  /**
* @param req.query -- patientId pagination query (start & count)
* @description get all admission records of a patients
*/
  static async getAllAdmissionRecordsForAPatientController(req, res) {
    const start = req.query.start || 0;
    const count = req.query.count || 20;
    const queryValidation = paginationQuery({ start, count });
    if (queryValidation.error) return failureResponse(res, queryValidation.error);

    try {
      const allRecords = await getAllAdmissionRecordForAPatient(req.params, { start, count });
      return successResponse(
        res,
        'fetched all admission records for a patient successfully',
        OK_CODE,
        allRecords
      );
    } catch (error) {
      return serverFailure(res, 'Could not fetch patient');
    }
  }
}

module.exports = PatientController;
