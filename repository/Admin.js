const { Op } = require('sequelize');
const { Admin: adminModel, Employee: employeeModel, EmployeeDetails:  employeeDetailsModel} = require('../database/models');

class Admin {
  static async create(field = {}, transaction = {}) {
    const { email, role, password } = field;
    const employee = await employeeModel.create(
      {
        email,
        password,
        role
      },
      transaction
    );

    return employeeDetailsModel.create(
      {
        ...field,
        employeeId: employee.id,
      },
      transaction
    );
  }

  /**
   * @description This controller is used to get an admin by email
  */
  static async getAdminByEmail(field = {}, transaction = {}) {
    const { email } = field;
    return adminModel.findOne(
      {
        where: {
          email
        }
      }, transaction
    );
  }

  static async getEmployeeByEmail(field = {}, transaction = {}) {
    const { email } = field;
    return employeeModel.findOne(
      {
        where: {
          email
        }
      }, transaction
    );
  }

  static async getEmployeeDetailsById(field = {}, transaction = {}) {
    const { employeeDetailsId } = field;
    return employeeDetailsModel.findOne(
      {
        where: {
         id:  employeeDetailsId
        }
      }, transaction
    );
  }

  static async updateEmployeeDetail(field = {}, previous_record = {}, transaction = {}) {
    const firstName = field.firstName || previous_record.firstName;
    const lastName = field.lastName || previous_record.lastName;
    const dateOfBirth = field.dateOfBirth || previous_record.dateOfBirth;
    const gender = field.gender || previous_record.gender;
    const phoneNumber = field.phoneNumber || previous_record.phoneNumber;
    const address = field.address || previous_record.address;

    return await employeeDetailsModel.update(
      {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phoneNumber,
        address
      },
      {
        where: { id: previous_record.id }, returning: true
      },
      transaction
    );
  }
}

module.exports = Admin;
