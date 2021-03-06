const bcrypt = require("bcrypt");
const {
  Employee: employeeModel,
  EmployeeDetails: employeeDetailsModel,
} = require("../database/models");
const employeeDetails = require("../database/models/employeeDetails");

class Employee {
  static async createEmployeeFn(field = {}, transaction = {}) {
    const { email, specialty, password } = field;
    const upperCaseSpecialty = specialty.toUpperCase();
    //  hash the incoming password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const employee = await employeeModel.create(
      {
        email,
        password: hashedPassword,
        role: "EMPLOYEE",
        specialty: upperCaseSpecialty,
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

  static async getEmployeeByEmail(field = {}, transaction = {}) {
    const { email } = field;
    return employeeModel.findOne(
      {
        where: {
          email,
        },
      },
      transaction
    );
  }

  static async getEmployeeDetailsById(field = {}, transaction = {}) {
    const { employeeDetailsId } = field;

    return employeeDetailsModel.findOne(
      {
        where: {
          id: employeeDetailsId,
        },
      },
      transaction
    );
  }

  static async updateEmployeeDetail(
    field = {},
    previous_record = {},
    transaction = {}
  ) {
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
        address,
        updatedAt: new Date(),
      },
      {
        where: { id: previous_record.id },
        returning: true,
      },
      transaction
    );
  }
}

module.exports = Employee;
