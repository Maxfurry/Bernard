const { RESOURCE_CREATED_CODE, NOT_FOUND_CODE, OK_CODE } = require('../constants');
const { successResponse, serverFailure, failureResponse } = require('../utils/helperFunction');
const { create, updateAdmissionRecord, deleteAdmissionRecord, getAdmissionRecord } = require('../repository/Admission');
const { getPatient } = require('../repository/Patient');
const { sequelize } = require('../database/models');
const validateParms = require('../middleware/AdmissionController.validation');
const { idValidation } = require('../middleware/generalValidation');

class PatientController {
    /**
     * @param req.body -  {
     * patientId, admittedOn, dischargedOn, roomNumber, bedNumber
     * }
     * @description admit a patient by Id
     */
    static async admitPatient(req, res) {
        const transaction = await sequelize.transaction();
        const validation = validateParms.admitPatient(req.body);
        if (validation.error) return failureResponse(res, validation.error);

        try {
            const patientExist = await getPatient({ id: req.body.patientId });
            if (!patientExist) return failureResponse(res, 'Patient not found', NOT_FOUND_CODE);

            const newAdmittedPatient = await create(req.body, { transaction });
            await transaction.commit();
            return successResponse(
                res,
                'Patient Admitted Successfully!',
                RESOURCE_CREATED_CODE,
                newAdmittedPatient
            );
        } catch (error) {
            await transaction.rollback();
            return serverFailure(res, 'Could not admit patient');
        }
    }


}

module.exports = PatientController;
