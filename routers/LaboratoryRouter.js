const router = require('express').Router();

const LaboratoryController = require('../controllers/LaboratoryController');
const checkToken = require('../middleware/checkToken');

router.post('/create', checkToken, LaboratoryController.createLabReport);
router.put('/edit/:reportId',checkToken, LaboratoryController.updatePatientLabReport);
router.get('/:reportId',checkToken, LaboratoryController.getPatientLabReportById)
router.get('/:patientId/all',checkToken, LaboratoryController.getAllLabReportsForAPatientController)

module.exports = router;
