const router = require('express').Router();

const AuthRouter = require('./AuthRouter');
const PatientRouter = require('./PatientRouter');
const AdmitRouter = require('./AdmissionRouter');

router.use('/auth', AuthRouter);
router.use('/patient', PatientRouter);
router.use('/patient/admit', AdmitRouter);

module.exports = router;
