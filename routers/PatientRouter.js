const router = require('express').Router();

const PatientController = require('../controllers/PatientController');

router.post('/auth/signup', PatientController.register);

// to search for a patient
router.get('/search', PatientController.searchForPatient);

// to get a patient by their Id
router.get('/profile/:id', PatientController.getPatientById);

// to register a patient
router.post('/', PatientController.register);

// get all patients
router.get('/all', PatientController.getAllPatients);

router.get('/records/:patientId', PatientController.getAllAdmissionRecordsForAPatientController);
module.exports = router;
