const router = require('express').Router();

const PatientController = require('../controllers/PatientController');
const checkToken = require('../middleware/checkToken');


// to search for a patient
router.get('/search', checkToken, PatientController.searchForPatient);

// to get a patient by their Id
router.get('/profile/:id', checkToken, PatientController.getPatientById);

router.put('/profile/:patientId/edit', checkToken, PatientController.updatePatientRecord);

// get all patients
router.get('/all', checkToken, PatientController.getAllPatients);

router.get('/records/:patientId', checkToken, PatientController.getAllAdmissionRecordsForAPatientController);
module.exports = router;
