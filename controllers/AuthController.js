const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { serverFailure, failureResponse, successResponse } = require('../utils/helperFunction');
const {
  OK_CODE
} = require('../constants');
const validateParms = require('../middleware/AuthController.validation');
const { getPatientByEmail } = require('../repository/Patient');
require('dotenv').config();

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
          return jwt.sign({
            user: recordExist,
            role: 'PATIENT'
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
      return serverFailure(res, 'Could login admin');
    }
  }

  // static async Signup(req, res) {
  //   bcrypt.compare(res);
  //   return res.status(OK_CODE).send('Log in Successful!');
  // }
}

module.exports = AuthController;
