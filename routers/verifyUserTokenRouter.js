const router = require('express').Router();

const VerifyUserToken = require('../controllers/verifyUserToken');
const checkToken = require('../middleware/checkToken');

// to verify user token
router.get('/', checkToken,  VerifyUserToken.verify);

module.exports = router;
