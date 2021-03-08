const router = require('express').Router();

const VerifyUserToken = require('../controllers/verifyUserToken');

// to verify user token
router.post('/', VerifyUserToken.verify);

module.exports = router;
