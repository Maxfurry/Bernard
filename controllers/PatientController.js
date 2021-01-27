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
    let validation = validateParms.id(req.params);
    if (validation.error) return failureResponse(res, validation.error);

    try {
      const singlePatient = await getPatient(req.params, { transaction })

      return successResponse(
        res,
        'Patient details fetched successfully',
        OK_CODE,
        singlePatient
      )
    } catch (error) {
      console.log(error);
      return serverFailure(res, 'Could not fetch patient')
    }
  }

  /**
 * @param req.query firstname, lastname
 * @description search for a patient by their firstname or lastname
 */
  static async searchForPatient(req, res) {
    let validation = validateParms.searchForPatient(req.query);
    if (validation.error) return failureResponse(res, validation.error);

    try {
      const singlePatient = await searchForPatient(req.query.name, { transaction })
      return successResponse(
        res,
        'search results',
        OK_CODE,
        singlePatient
      )
    } catch (error) {
      console.log(error);
      return serverFailure(res, 'Could not fetch patient')
    }
  }
}

module.exports = PatientController;
