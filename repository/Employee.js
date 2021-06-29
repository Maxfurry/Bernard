const bcrypt = require("bcrypt");
const {
  Employee: employeeModel,
  EmployeeDetails: employeeDetailsModel,
  Prescriptions: prescriptionModel,
  Timelines: timelineModel,
  Invoice: invoiceModel,
  InvoiceItem: invoiceItemModel,
  Receipt: receiptModel,
  ReceiptItem: receiptItemModel
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

  static async getPrescriptionsByPatientId(field = {}, transaction = {}) {
    const { patientId } = field;

    return prescriptionModel.findAll(
      {
        where: {
         patientId,
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

  static async deletePrescription(field = {}, transaction = {}) {
    return await prescriptionModel.destroy(
      { returning: true, where: { id: field.prescriptionId } },
      transaction
    );
  }


  static async createInvoice(field = {}, transaction = {}) {
    const { series, No, date , patientId, items} = field;
    let InvoiceItems = [];

    const invoice = await invoiceModel.create(
      {
      series,
      No,
      date,
      patientId
      },
      transaction
    );

      if(items && items instanceof Array && items.length > 0){
        for(let i = 0; i < items.length; i++){
          const newInvoiceItem = await invoiceItemModel.create(
            {
              ...items[i],
              invoiceId: invoice.id
            },
            transaction
          );
          InvoiceItems = [...InvoiceItems, newInvoiceItem]
        }
      }

      return {
        invoice,
        items: InvoiceItems
      }
  }

  static async getInvoiceByPatientId(field = {}, transaction = {}) {
    const { patientId } = field;

    return invoiceModel.findAll(
      {
        where: {
         patientId,
        },
        include: [
          {
            model: invoiceItemModel,
            as: 'items',
          }
        ]
      },
      transaction
    );
  }

  static async createReceiptFn(field = {}, transaction = {}) {
    const {series, No,  amount , paymentMode,  date , patientId, items} = field;
    let ReceiptItems = [];

    const receipt = await receiptModel.create(
      {
      series,
      No,
      amount,
      paymentMode,
      date,
      patientId
      },
      transaction
    );

      if(items && items instanceof Array && items.length > 0){
        for(let i = 0; i < items.length; i++){
          const newReceiptItem = await receiptItemModel.create(
            {
              ...items[i],
              receiptId: receipt.id
            },
            transaction
          );
          ReceiptItems = [...ReceiptItems, newReceiptItem]
        }
      }

      return {
        receipt,
        items: ReceiptItems
      }
  }

  static async getReceiptByPatientId(field = {}, transaction = {}) {
    const { patientId } = field;

    return receiptModel.findAll(
      {
        where: {
         patientId,
        },
        include: [
          {
            model: receiptItemModel,
            as: 'items',
          }
        ]
      },
      transaction
    );
  }

  static async getTimelineByPatientId(field = {}, transaction = {}) {
    const { patientId } = field;

    return timelineModel.findAll(
      {
        where: {
         patientId,
        },
      },
      transaction
    );
  }

  static async getTimeline(field = {}, transaction = {}) {
    const { id } = field;

    return timelineModel.findOne(
      {
        where: {
         id,
        },
      },
      transaction
    );
  }

  static async deleteTimeline(field = {}, transaction = {}) {
    return await timelineModel.destroy(
      { returning: true, where: { id: field.id } },
      transaction
    );
  }

  static async deleteInvoice(field = {}, transaction = {}) {
    return await invoiceModel.destroy(
      { returning: false, where: { id: field.id } },
      transaction
    );
  }

  static async getInvoice(field = {}, transaction = {}) {
    const { id } = field;

    return invoiceModel.findOne(
      {
        where: {
         id,
        },
      },
      transaction
    );
  }

  static async deleteReceipt(field = {}, transaction = {}) {
    return await receiptModel.destroy(
      { returning: false, where: { id: field.id } },
      transaction
    );
  }

  
  static async getReceipt(field = {}, transaction = {}) {
    const { id } = field;

    return receiptModel.findOne(
      {
        where: {
         id,
        },
      },
      transaction
    );
  }


}

module.exports = Employee;
