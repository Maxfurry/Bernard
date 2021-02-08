const { RESOURCE_CREATED_CODE, OK_CODE, NOT_FOUND_CODE } = require('../constants');
const { successResponse, serverFailure, failureResponse } = require('../utils/helperFunction');
const {
    createPatientLabReport, getPatientLabReport, updatePatientLabReport, getAllLabReportForAPatient
} = require('../repository/PatientLabReport');
const { sequelize } = require('../database/models');
const validateParms = require('../middleware/PatientLabReport.validation');
const { idValidation } = require('../middleware/generalValidation');

class PatientLabReportController {
    static async createLabReport(req, res) {
        const validation = validateParms.createLabReportPatient(req.body);
        if (validation.error) return failureResponse(res, validation.error);

        const transaction = await sequelize.transaction();
        try {
            const newPatientLabRecord = await createPatientLabReport(req.body, { transaction });
            await transaction.commit();
            return successResponse(
                res,
                'Patient Lab Report Created Successfully!',
                RESOURCE_CREATED_CODE,
                newPatientLabRecord
            );
        } catch (error) {
            await transaction.rollback();
            return serverFailure(res, 'Could not create patient lab report');
        }
    }


}

module.exports = PatientLabReportController;
