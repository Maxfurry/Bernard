const router = require('express').Router();

const PatientLabReportController = require('../controllers/PatientLabReportController');

router.post('/create', PatientLabReportController.createLabReport);
router.patch('/edit/:reportId', PatientLabReportController.updatePatientLabReport);
router.get('/:reportId', PatientLabReportController.getPatientLabReportById)
router.get('/:patientId/all', PatientLabReportController.getAllLabReportsForAPatientController)

module.exports = router;
