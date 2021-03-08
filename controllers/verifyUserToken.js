const jwt = require('jsonwebtoken');
const { serverFailure, failureResponse, successResponse } = require('../utils/helperFunction');
const {
    OK_CODE, FORBIDDEN_CODE
} = require('../constants');

require('dotenv').config();

class verifyUserToken {
    static async verify(req, res) {
        const { token } = req.body;
        try {
           return jwt.verify(token, process.env.SECRET_JWT_KEY, function(err, decoded) {
                if (err) {
                  return failureResponse(res, err, FORBIDDEN_CODE);
                }else{
                 return successResponse(res, 'valid', OK_CODE, decoded)
                }
            });
        } catch (error) {
            return serverFailure(res, 'Could verify user');
        }
    }

}

module.exports = verifyUserToken;
