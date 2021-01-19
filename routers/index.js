const router = require('express').Router();

const AuthRouter = require('./AuthRouter');
const PatientRouter = require('./PatientRouter');

router.use('/auth', AuthRouter);
router.use('/patient', PatientRouter);

module.exports = router;
