const bcrypt = require("bcrypt");
const {
  Employee: employeeModel,
  EmployeeDetails: employeeDetailsModel,
  Prescriptions: prescriptionModel,
  Timelines: timelineModel
} = require("../database/models");

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
    const drugName = field.drugName || previous_record.drugName;
    const dosage = field.dosage || previous_record.dosage;
    const drugType = field.drugType || previous_record.drugType;
    const startDate = field.startDate || previous_record.startDate;
    const period = field.period || previous_record.period;
    const note = field.note || previous_record.note;

    return await employeeDetailsModel.update(
      {
        drugName,
        dosage,
        drugType,
        startDate,
        period,
        note,
        updatedAt: new Date(),
      },
      {
        where: { id: previous_record.id },
        returning: true,
      },
      transaction
    );
  }

  static async getAllEmployeeData(query, transaction = {}) {
    return employeeModel.findAll({
      include: [
        {
          model: employeeDetailsModel,
          as: 'employeeDetails',
        }
      ]
    }, transaction);
  }

  static async getPrescriptionsById(field = {}, transaction = {}) {
    const { prescriptionId } = field;

    return prescriptionModel.findOne(
      {
        where: {
          id: prescriptionId,
        },
      },
      transaction
    );
  }


  static async createPrescriptionFn(field = {}, transaction = {}) {

    return await prescriptionModel.create(field, transaction);
  }

  static async createTimelineFn(field = {}, transaction = {}) {

    return await timelineModel.create(field, transaction);
  }


  static async updatePrescription(
    field = {},
    previous_record = {},
    transaction = {}
  ) {
    const drugName = field.drugName || previous_record.drugName;
    const dosage = field.dosage || previous_record.dosage;
    const drugType = field.drugType || previous_record.drugType;
    const startDate = field.startDate || previous_record.startDate;
    const period = field.period || previous_record.period;
    const note = field.note || previous_record.note;

    return await prescriptionModel.update(
      {
        drugName,
        dosage,
        drugType,
        startDate,
        period,
        note,
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
