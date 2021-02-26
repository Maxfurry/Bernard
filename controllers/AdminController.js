const bcrypt = require('bcrypt');
const { sequelize } = require('../database/models');
const { serverFailure, failureResponse, successResponse } = require('../utils/helperFunction');
const {
    OK_CODE, NOT_FOUND_CODE, RESOURCE_CREATED_CODE
} = require('../constants');
const validateParms = require('../middleware/AdminController.validation');
const { getAdminByEmail, getEmployeeByEmail, updateEmployeeDetail , getEmployeeDetailsById, create } = require('../repository/Admin');
const { idValidation } = require('../middleware/generalValidation');

class AdminController {
    static async Login(req, res) {
        const { email, password } = req.body;
        try {
            const validation = validateParms.login(req.body);
            if (validation.error) return failureResponse(res, validation.error);


            const recordExist = await getAdminByEmail({ email });
            if (recordExist) {
                const match = await bcrypt.compare(
                    password,
                    recordExist.password,
                );

                if (match) {
                    return res.status(OK_CODE).send('Log in Successful!');
                }
                return failureResponse(res, 'Incorrect email or password');
            }

            return failureResponse(res, 'Incorrect email or password');
        } catch (error) {
            await transaction.rollback();
            return serverFailure(res, 'Could login patients');
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
        const transaction = await sequelize.transaction();
        const validation = validateParms.createEmployee(req.body);
        if (validation.error) return failureResponse(res, validation.error);

        try {
            const employeeExist = await getEmployeeByEmail({ email: req.body.email });
            if (employeeExist) return failureResponse(res, 'Email already exist', NOT_FOUND_CODE);

            const newCreatedEmployee = await create(req.body, { transaction });
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
* @description update a patient record by patient Id
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
            console.log({error})
            return serverFailure(res, 'Could not update employee details');
        }
    }
}

module.exports = AdminController;
