const { RESOURCE_CREATED_CODE } = require("../constants");
const { successResponse, serverFailure } = require("../utils/helperFunction");
const { create } = require("../repository/Patient");
const { sequelize } = require("../database/models");

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
}

module.exports = PatientController;
