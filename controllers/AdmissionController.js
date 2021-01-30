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

    /**
 * @param req.body -  {
 *  recordId, admittedOn, dischargedOn, roomNumber, bedNumber
 * }
 * @description update a patient addmission record by record Id
 */
    static async updateAdmittedRecord(req, res) {
        const validation = idValidation({ id: req.params.recordId });
        if (validation.error) return failureResponse(res, 'recordId is required or Invalid');

        try {
            const recordExist = await getAdmissionRecord({ recordId: req.params.recordId });
            if (!recordExist) return failureResponse(res, 'Record not found', NOT_FOUND_CODE);

            const updatedAdmissionRecord = await updateAdmissionRecord(req.body, recordExist);
            return successResponse(
                res,
                'Patient Admission Record Updated Successfully!',
                OK_CODE,
                updatedAdmissionRecord
            );
        } catch (error) {
            return serverFailure(res, 'Could not update admission record');
        }
    }

    /**
* @param req.params -- recordId
* @description delete a patient addmission record by record Id
*/
    static async deleteAdmissionRecordController(req, res) {
        const validation = idValidation({ id: req.params.recordId });
        if (validation.error) return failureResponse(res, 'recordId is required or Invalid');

        try {
            await deleteAdmissionRecord(req.params);
            return successResponse(
                res,
                'Patient Admission Record Deleted Successfully!',
                OK_CODE
            );
        } catch (error) {
            return serverFailure(res, 'Could not delete admission record');
        }
    }

}

module.exports = PatientController;
