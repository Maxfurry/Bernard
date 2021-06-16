const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../database/models');
const { serverFailure, failureResponse, successResponse } = require('../utils/helperFunction');
const {
    OK_CODE, NOT_FOUND_CODE, RESOURCE_CREATED_CODE, BAD_REQUEST
} = require('../constants');
const validateParms = require('../middleware/EmployeeController.validation');
const { login: validatelogin } = require('../middleware/AuthController.validation');
const {deleteReceipt ,deleteInvoice,getTimeline, createReceiptFn ,createInvoice ,getEmployeeByEmail, getAllEmployeeData, updateEmployeeDetail, getEmployeeDetailsById, createEmployeeFn, createPrescriptionFn, getPrescriptionsById, getPrescriptionsByPatientId, updatePrescription, createTimelineFn, getInvoiceByPatientId, getReceiptByPatientId, getTimelineByPatientId, deleteTimeline, getInvoice, getReceipt } = require('../repository/Employee');
const { idValidation } = require('../middleware/generalValidation');
const { deletePatient, getPatient } = require('../repository/Patient');
const { upLoad } = require('./UploadController');
require('dotenv').config();

class EmployeeController {
    static async Login(req, res) {
        const { email, password } = req.body;
        try {
            const validation = validatelogin(req.body);
            if (validation.error) return failureResponse(res, validation.error);


            const recordExist = await getEmployeeByEmail({ email });
            if (recordExist) {
                const match = await bcrypt.compare(
                    password,
                    recordExist.password,
                );

                if (match) {
                    return jwt.sign({
                        user: {
                            email : recordExist.email,
                            firstname: recordExist.firstname,
                            lastname: recordExist.lastname
                        },
                        role: recordExist.role,
                        specialty: recordExist.specialty
                    }, process.env.SECRET_JWT_KEY, { expiresIn: '30d' }, async (err, token) => {
                        if (err) {
                            return res.status(403).send({ message: err });
                        }
                        return successResponse(
                            res,
                            'Log in Successful!',
                            OK_CODE,
                            {
                                user: recordExist,
                                token
                            }
                        );
                    });
                }
                return failureResponse(res, 'Incorrect email or password');
            }

            return failureResponse(res, 'Incorrect email or password');
        } catch (error) {
            return serverFailure(res, 'Could login in admin or employee');
        }
    }


    /**
     * @param req.body -  {
     *  email
     *  password
        firstname
        lastName
        role
        dateOfBirth
        gender
        phoneNumber
        address
     * }
     * @description create an employee
     */
    static async createEmployee(req, res) {
        const { role } = req.user;
        const transaction = await sequelize.transaction();
        const validation = validateParms.createEmployee(req.body);
        if (validation.error) return failureResponse(res, validation.error);

        try {
            if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);
            const employeeExist = await getEmployeeByEmail({ email: req.body.email });
            if (employeeExist) return failureResponse(res, 'Email already exist', NOT_FOUND_CODE);

            const newCreatedEmployee = await createEmployeeFn(req.body, { transaction });
            await transaction.commit();
            return successResponse(
                res,
                'Employee Created Successfully!',
                RESOURCE_CREATED_CODE,
                newCreatedEmployee
            );
        } catch (error) {
            await transaction.rollback();
            return serverFailure(res, 'Could not create employee');
        }
    }


    /**
* @param req.body -  {
    firstname
    lastName
    dateOfBirth
    gender
    phoneNumber
    address
* }
* @description update an employee record
*/
    static async updateEmployeeDetails(req, res) {
        const validation = idValidation({ id: req.params.employeeDetailsId });
        if (validation.error) return failureResponse(res, 'employeeId is required or Invalid');

        try {
            const recordExist = await getEmployeeDetailsById(req.params);
            if (!recordExist) return failureResponse(res, 'employee Details Id record not found', NOT_FOUND_CODE);

            const updatedEmployeeDetails = await updateEmployeeDetail(req.body, recordExist);
            return successResponse(
                res,
                'Employee Details Updated Successfully!',
                OK_CODE,
                updatedEmployeeDetails[1]
            );
        } catch (error) {
            return serverFailure(res, 'Could not update employee details');
        }
    }

    /**
* @param req.query -- pagination query (start & count)
* @description get all patients
*/
    static async getAllEmployee(req, res) {
        const { role } = req.user;
        if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);

        try {
            const allEmployee = await getAllEmployeeData();
            return successResponse(
                res,
                'fetched all empolyee successfully',
                OK_CODE,
                allEmployee
            );
        } catch (error) {
            return serverFailure(res, 'Could not fetch patient');
        }
    }

      /**
* @param req.params -- patientId
* @description delete a patient, only admins can do that
*/
static async deletePatientController(req, res) {
      const { role } = req.user;
    const validation = idValidation({ id: req.params.patientId });
    if (validation.error) return failureResponse(res, 'patientId is required or Invalid');
    if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);
    
    try {
      const singlePatient = await getPatient({id: req.params.patientId});
      if(!singlePatient)  if (!recordExist) return failureResponse(res, 'patient record not found', NOT_FOUND_CODE);
      await deletePatient(req.params);
      return successResponse(
        res,
        'Patient Deleted Successfully!',
        OK_CODE
      );
    } catch (error) {
      return serverFailure(res, 'Could not delete patient');
    }
  }

      /**
* @param 
* @description get employee profile
*/
static async getEmployeeProfile(req, res) {
    const { user } = req.user;
    
    try {
        const profile = await getEmployeeByEmail({email : user.email});
        const profileDetails = await getEmployeeDetailsById({employeeDetailsId: profile.id})
        return successResponse(
            res,
            'fetched profile successfully',
            OK_CODE,
            {
                profile,
                profileDetails : profileDetails ||  'no data'
            }
        );
    } catch (error) {
        return serverFailure(res, 'Could not fetch patient');
    }
}

 /**
     * @param req.body -  {
     *   drugName,
        dosage,
        drugType,
        startDate,
        period,
        note,
     * }
     * @description create a prescription
     */
        static async createPrescription(req, res) {
            const { role } = req.user;
            const transaction = await sequelize.transaction();
            const validation = validateParms.createPrescription(req.body);
            if (validation.error) return failureResponse(res, validation.error);
    
            try {
                if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);
                const patientExist = await getPatient({ id: req.body.patientId });
                if (!patientExist) return failureResponse(res, 'Patient does not exist', NOT_FOUND_CODE);
    
                const newCreatedPrescription = await createPrescriptionFn(req.body , { transaction });
                await transaction.commit();
                return successResponse(
                    res,
                    'Prescription Created Successfully!',
                    RESOURCE_CREATED_CODE,
                    newCreatedPrescription
                );
            } catch (error) {
                await transaction.rollback();
                return serverFailure(res, 'Could not create prescription');
            }
        }

        static async updatePrescription(req, res) {
            const { role } = req.user;
            const validation = idValidation({ id: req.params.prescriptionId });
            if (validation.error) return failureResponse(res, 'prescriptionId is required or Invalid');
    
            try {
                if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);
                const recordExist = await getPrescriptionsById(req.params);
                if (!recordExist) return failureResponse(res, 'employee Details Id record not found', NOT_FOUND_CODE);
    
                const updatedEmployeeDetails = await updatePrescription(req.body, recordExist);
                return successResponse(
                    res,
                    'Employee Details Updated Successfully!',
                    OK_CODE,
                    updatedEmployeeDetails[1]
                );
            } catch (error) {
                return serverFailure(res, 'Could not update prescription');
            }
        }
    
        static async viewPrescription(req, res) {
            const { role } = req.user;
            const validation = idValidation({ id: req.params.patientId });
            if (validation.error) return failureResponse(res, 'patientId is required or Invalid');
    
            try {
                if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);
                const recordExist = await getPrescriptionsByPatientId(req.params);
                return successResponse(
                    res,
                    'fetched all prescription successfully',
                    OK_CODE,
                    recordExist
                );
            } catch (error) {
                return serverFailure(res, 'Could not get prescriptions');
            }
        }
    

        static async createTimeline(req, res) {
            const { role } = req.user;
            const { document: documentFile } = req.files;
            const transaction = await sequelize.transaction();
            const validation = validateParms.createTimeline(req.body);
            if (validation.error) return failureResponse(res, validation.error);
    
            try {
                if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);
                const patientExist = await getPatient({ id: req.body.patientId });
                if (!patientExist) return failureResponse(res, 'Patient does not exist', NOT_FOUND_CODE);
                
               
                if(documentFile){
                    const uploadedDocument = await upLoad(documentFile, res);
                    const newCreatedTimeline = await createTimelineFn({...req.body, document: uploadedDocument.secure_url} , { transaction });
                    await transaction.commit();
                    return successResponse(
                        res,
                        'Timeline Created Successfully!',
                        RESOURCE_CREATED_CODE,
                        newCreatedTimeline
                    );
                }


                const newCreatedTimeline = await createTimelineFn({...req.body, document: uploadedDocument.secure_url} , { transaction });
                await transaction.commit();
                return successResponse(
                    res,
                    'Timeline Created Successfully!',
                    RESOURCE_CREATED_CODE,
                    newCreatedTimeline
                );
            } catch (error) {
                await transaction.rollback();
                return serverFailure(res, 'Could not create timeline');
            }
        }

        static async viewTimeline(req, res) {
            const { role } = req.user;
            const validation = idValidation({ id: req.params.patientId });
            if (validation.error) return failureResponse(res, 'patientId is required or Invalid');
    
            try {
                if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);
                const recordExist = await getTimelineByPatientId(req.params);
                return successResponse(
                    res,
                    'fetched all timeline successfully',
                    OK_CODE,
                    recordExist
                );
            } catch (error) {
                return serverFailure(res, 'Could not get timeline');
            }
        }


        static async deleteTimeline(req, res) {
            const { role } = req.user;
          if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);
          
          try {
            const singleTimeline = await getTimeline({id: req.params.id});
            if (!singleTimeline) return failureResponse(res, 'timeline record not found', NOT_FOUND_CODE);
            await deleteTimeline(req.params);
            return successResponse(
              res,
              'Timeline Deleted Successfully!',
              OK_CODE
            );
          } catch (error) {
            return serverFailure(res, 'Could not delete timeline');
          }
        }

        

            /**
     * @param req.body -  {
     *  email
     *  password
        firstname
        lastName
        role
        dateOfBirth
        gender
        phoneNumber
        address
     * }
     * @description create an employee
     */
    static async createInvoice(req, res) {
        const { role } = req.user;
        const transaction = await sequelize.transaction();

        try {
            if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);

            const newCreatedInvoice = await createInvoice(req.body, { transaction });
            await transaction.commit();
            return successResponse(
                res,
                'Invoice Created Successfully!',
                RESOURCE_CREATED_CODE,
                newCreatedInvoice
            );
        } catch (error) {
            await transaction.rollback();
            return serverFailure(res, 'Could not create invoice');
        }
    }

    static async viewInvoice(req, res) {
        const validation = idValidation({ id: req.params.patientId });
        if (validation.error) return failureResponse(res, 'patientId is required or Invalid');

        try {
           const recordExist = await getInvoiceByPatientId(req.params);
            return successResponse(
                res,
                'fetched all invoice successfully',
                OK_CODE,
                recordExist
            );
        } catch (error) {
           return serverFailure(res, 'Could not get invoice');
        }
    }

                /**
     * @param req.body -  {
     *  email
     *  password
        firstname
        lastName
        role
        dateOfBirth
        gender
        phoneNumber
        address
     * }
     * @description create an employee
     */
        static async createReceipt(req, res) {
            const { role } = req.user;
            const transaction = await sequelize.transaction();
    
            try {
                if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);
    
                const newCreatedReceipt = await createReceiptFn(req.body, { transaction });
                await transaction.commit();
                return successResponse(
                    res,
                    'Receipt Created Successfully!',
                    RESOURCE_CREATED_CODE,
                    newCreatedReceipt
                );
            } catch (error) {
                await transaction.rollback();
                return serverFailure(res, 'Could not create receipt');
            }
        }

        static async viewReciept(req, res) {
            const validation = idValidation({ id: req.params.patientId });
            if (validation.error) return failureResponse(res, 'patientId is required or Invalid');
    
            try {
               const recordExist = await getReceiptByPatientId(req.params);
                return successResponse(
                    res,
                    'fetched all receipt successfully',
                    OK_CODE,
                    recordExist
                );
            } catch (error) {
               return serverFailure(res, 'Could not get invoice');
            }
        }

        static async deleteReceipt(req, res) {
            const { role } = req.user;
          if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);
          
          try {
            const singleReceipt = await getReceipt({id: req.params.id});
            if (!singleReceipt) return failureResponse(res, 'receipt record not found', NOT_FOUND_CODE);
            await deleteReceipt(req.params);

            return successResponse(
              res,
              'Receipt Deleted Successfully!',
              OK_CODE
            );
          } catch (error) {
            return serverFailure(res, 'Could not delete receipt');
          }
        }
        
        static async deleteInvoice(req, res) {
            const { role } = req.user;
          if (role.toUpperCase() !== 'ADMIN') return failureResponse(res, 'Route restricted to admin only', BAD_REQUEST);
          
          try {
            const singleInvoice = await getInvoice({id: req.params.id});
            if (!singleInvoice) return failureResponse(res, 'invoice record not found', NOT_FOUND_CODE);
            await deleteInvoice(req.params);

            return successResponse(
              res,
              'Invoice Deleted Successfully!',
              OK_CODE
            );
          } catch (error) {
            return serverFailure(res, 'Could not delete invoice');
          }
        }

}

module.exports = EmployeeController;
