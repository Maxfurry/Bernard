const { RESOURCE_CREATED_CODE, OK_CODE } = require("../constants");
const { successResponse, serverFailure, failureResponse } = require("../utils/helperFunction");
const { create, getPatient, searchForPatient } = require("../repository/Patient");
const { sequelize } = require("../database/models");
const validateParms = require("../middleware/PatientController.validation");

class PatientController {
  static async register(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const newPatient = await create(req.body, { transaction });
      await transaction.commit();
      return successResponse(
        res,
        "Patient Registration Successfully!",
        RESOURCE_CREATED_CODE,
        newPatient
      );
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return serverFailure(res, "Could not register patient");
    }
  }


  /**
   * @param req.params -  id
   * @description get a patient by Id
   */
  static async getPatientById(req, res) {
    let validation = validateParms.id(req.query);
    if (validation.error) return failureResponse(res, validation.error);
    const transaction = await sequelize.transaction();

    try {
      const singlePatient = await getPatient(req.params, { transaction })
      await transaction.commit();
      return successResponse(
        res,
        'patient profile fetched successfully',
        OK_CODE,
        singlePatient
      )
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return serverFailure(res, 'Could not fetch patient')
    }
  }

}

module.exports = PatientController;
