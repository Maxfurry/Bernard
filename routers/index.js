const router = require('express').Router();

const AuthRouter = require('./AuthRouter');
const PatientRouter = require('./PatientRouter');
const AdmitRouter = require('./AdmissionRouter');
const PatientLabReportRouter = require('./LaboratoryRouter');
const EmployeeRouter = require('./EmployeeRouter');


router.use('/auth', AuthRouter);
router.use('/patient', PatientRouter);
router.use('/patient/admit', AdmitRouter);
router.use('/lab/report', PatientLabReportRouter);
router.use('/employee', EmployeeRouter);

module.exports = router;
