const router = require('express').Router();

const AuthRouter = require('./AuthRouter');
const PatientRouter = require('./PatientRouter');
const AdmitRouter = require('./AdmissionRouter');
const PatientLabReportRouter = require('./PatientLabReportRouter');

router.use('/auth', AuthRouter);
router.use('/patient', PatientRouter);
router.use('/patient/admit', AdmitRouter);
router.use('/lab/report', PatientLabReportRouter);

module.exports = router;
