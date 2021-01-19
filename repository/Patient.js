const bcrypt = require("bcrypt");
const { Patient: model, User: userModel } = require("../database/models");

class Patient {
  static async create(field = {}, transaction = {}) {
    const { email, password } = field;

    const user = await userModel.create(
      {
        email,
        password,
        userType: "Patient",
      },
      transaction
    );

    return await model.create(
      {
        ...field,
        userId: user.id,
      },
      transaction
    );
  }
}

module.exports = Patient;
