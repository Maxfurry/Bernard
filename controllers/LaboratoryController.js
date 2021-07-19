const { RESOURCE_CREATED_CODE, OK_CODE, NOT_FOUND_CODE } = require('../constants');
const { successResponse, serverFailure, failureResponse } = require('../utils/helperFunction');
const {
    createPatientLabReport, getPatientLabReport, updatePatientLabReport, getAllLabReportForAPatient
} = require('../repository/Laboratory');
const { upLoad } = require('./UploadController');
const { sequelize } = require('../database/models');
const validateParms = require('../middleware/Laboratory.validation');
const { idValidation } = require('../middleware/generalValidation');

class PatientLabReportController {
    static async createLabReport(req, res) {
        const { document: documentFile } = req.files;
        const validation = validateParms.createLabReportPatient(req.body);
        if (validation.error) return failureResponse(res, validation.error);

        const transaction = await sequelize.transaction();
        try {
            
            if(documentFile){
                const uploadedDocument = await upLoad(documentFile, res);
                const newPatientLabRecord = await createPatientLabReport({...req.body, document: uploadedDocument.secure_url} , { transaction });
                await transaction.commit();
                return successResponse(
                    res,
                    'Patient Lab Report Created Successfully!',
                    RESOURCE_CREATED_CODE,
                    newPatientLabRecord
                );
            }

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

    /**
  * @param req.body -  {
      patientId
      testName
      isActive
      testValue
      minValue
      maxValue
      calUnit
      comment
  * }
  * @description update a patient Lab report by reportId
  */
    static async updatePatientLabReport(req, res) {
        const validation = idValidation({ id: req.params.reportId });
        if (validation.error) return failureResponse(res, 'reportId is required or Invalid');

        try {
            const recordExist = await getPatientLabReport({ id: req.params.reportId });
            if (!recordExist) return failureResponse(res, 'patient lab report not found', NOT_FOUND_CODE);

            const updatedPatientLabReport = await updatePatientLabReport(req.body, recordExist);
            return successResponse(
                res,
                'Patient Lab report Updated Successfully!',
                OK_CODE,
                updatedPatientLabReport[1]
            );
        } catch (error) {
           return serverFailure(res, 'Could not update patient lab report');
        }
    }

    /**
     * @param req.params -  id
     * @description get a lab report by reportId
     */
    static async getPatientLabReportById(req, res) {
        const validation = idValidation({id : req.params.reportId});
        if (validation.error) return failureResponse(res, validation.error);

        try {
            const singlePatientLabReport = await getPatientLabReport({id : req.params.reportId});

            return successResponse(
                res,
                'Patient lab report fetched successfully',
                OK_CODE,
                singlePatientLabReport
            );
        } catch (error) {
           return serverFailure(res, 'Could not fetch patient lab report');
        }
    }

    /**
  * @param req.params -- patientId
  * @description get all lab records of a patients
  */
    static async getAllLabReportsForAPatientController(req, res) {
        const validation = idValidation({id : req.params.patientId});
        if (validation.error) return failureResponse(res, validation.error);

        try {
            const alllabRecords = await getAllLabReportForAPatient(req.params);
            return successResponse(
                res,
                'fetched all lab reports for a patient successfully',
                OK_CODE,
                alllabRecords
            );
        } catch (error) {
            return serverFailure(res, 'Could not fetch patient');
        }
    }
}

module.exports = PatientLabReportController;
