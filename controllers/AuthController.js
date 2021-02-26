const bcrypt = require('bcrypt');
const { serverFailure, failureResponse } = require('../utils/helperFunction');
const {
  OK_CODE
} = require('../constants');
const validateParms = require('../middleware/AuthController.validation');

class AuthController {
  static async Login(req, res) {
    const { email, password } = req.body;
    try {
      const validation = validateParms.login(req.body);
      if (validation.error) return failureResponse(res, validation.error);


      const recordExist = await getPatientByEmail({ email });
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
      return serverFailure(res, 'Could login admin');
    }
  }

  static async Signup(req, res) {
    bcrypt.compare(res);
    return res.status(OK_CODE).send('Log in Successful!');
  }
}

module.exports = AuthController;
