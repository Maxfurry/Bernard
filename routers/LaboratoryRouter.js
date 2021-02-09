const router = require('express').Router();

const LaboratoryController = require('../controllers/LaboratoryController');

router.post('/create', LaboratoryController.createLabReport);
router.patch('/edit/:reportId', LaboratoryController.updatePatientLabReport);
router.get('/:reportId', LaboratoryController.getPatientLabReportById)
router.get('/:patientId/all', LaboratoryController.getAllLabReportsForAPatientController)

module.exports = router;
