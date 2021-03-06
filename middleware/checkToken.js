/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { serverFailure, failureResponse } = require('../utils/helperFunction');

const checkToken = (req, res, next) => {
  const header = req.headers.authorization;
  try {
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1] || req.token;
      const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
      if (decodedToken) {
        req.user = decodedToken;
        req.token = token;
        return next();
      }
      return failureResponse(res, 'Invalid token', 403)
    }
    // if header is undefined , return bad request
    return failureResponse(res, 'Not Authorized' , 403)

  } catch (error) {
    return serverFailure(res, 'cannot verify token');
  }
};

module.exports = checkToken;
