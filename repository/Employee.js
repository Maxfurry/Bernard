const bcrypt = require("bcrypt");
const {
  Employee: employeeModel,
  EmployeeDetails: employeeDetailsModel,
  Prescriptions: prescriptionModel,
  Timelines: timelineModel,
  Invoice: invoiceModel,
  InvoiceItem: invoiceItemModel,
  Income: incomeModel,
  Expenses: expenseModel,
  Patient: patientModel,
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


  static async createIncomeFn(field = {}, transaction = {}) {
    return incomeModel.create(field, transaction);
  }

  static async getIncomeById(field = {}, transaction = {}) {
    const { id } = field;

    return incomeModel.findOne(
      {
        where: {
          id,
        },
      },
      transaction
    );
  }

  static async updateIncomeFn(
    field = {},
    previous_record = {},
    transaction = {}
  ) {
    const incomeHead = field.incomeHead || previous_record.incomeHead;
    const invoiceNumber = field.invoiceNumber || previous_record.invoiceNumber;
    const amount = field.amount || previous_record.amount;
    const description = field.description || previous_record.description;
    const date = field.date || previous_record.date;

    return await incomeModel.update(
      {
       incomeHead,
       invoiceNumber,
       amount,
       description,
       date
      },
      {
        where: { id: previous_record.id },
        returning: true,
      },
      transaction
    );
  }

  static async getAllIncome(field = {}, transaction = {}) {
    return incomeModel.findAll();
  }

  static async deleteIncome(field = {}, transaction = {}) {
    return await incomeModel.destroy(
      { returning: false, where: { id: field.id } },
      transaction
    );
  }

  static async createExpenseFn(field = {}, transaction = {}) {
    return expenseModel.create(field, transaction);
  }

  static async getExpenseById(field = {}, transaction = {}) {
    const { id } = field;

    return expenseModel.findOne(
      {
        where: {
          id,
        },
      },
      transaction
    );
  }

  
  static async updateExpenseFn(
    field = {},
    previous_record = {},
    transaction = {}
  ) {
    const expensesHead = field.expensesHead || previous_record.expensesHead;
    const invoiceNumber = field.invoiceNumber || previous_record.invoiceNumber;
    const amount = field.amount || previous_record.amount;
    const description = field.description || previous_record.description;
    const date = field.date || previous_record.date;

    return await expenseModel.update(
      {
        expensesHead,
       invoiceNumber,
       amount,
       description,
       date
      },
      {
        where: { id: previous_record.id },
        returning: true,
      },
      transaction
    );
  }

  static async deleteExpense(field = {}, transaction = {}) {
    return await expenseModel.destroy(
      { returning: false, where: { id: field.id } },
      transaction
    );
  }

  static async getAnalytics(
    field = {},
    transaction = {}
  ) {

    const patientCount =  await patientModel.count();
    const staff_count = await employeeModel.count();
    const male_count = await  patientModel.count({
      where: { gender: 'male' }
    })
    const female_count = await patientModel.count({
      where: { gender: 'female' }
    })

    const male_percentage = (parseInt(male_count) * 100 / patientCount);
    const female_percentage = (parseInt(female_count) * 100 / patientCount);
    const ambulance =5;
  return {
   total_patient: patientCount,
   staff_count, 
   male_count, 
   female_count,
   male_percentage,
   female_percentage,
   ambulance
   }
  }
}

module.exports = Employee;
