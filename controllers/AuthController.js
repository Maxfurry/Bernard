const bcrypt = require('bcrypt');
const {
  OK_CODE
} = require('../constants');

class AuthController {
  static async authenticate(req, res) {
    return res.status(OK_CODE).send('Log in Successful!');
  }
}

module.exports = AuthController;
