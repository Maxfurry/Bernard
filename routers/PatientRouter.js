const router = require('express').Router();

const EmployeeController = require('../controllers/EmployeeController');
const PatientController = require('../controllers/PatientController');
const checkToken = require('../middleware/checkToken');


// to search for a patient
router.get('/search', checkToken, PatientController.searchForPatient);

router.get('/profile/me', checkToken, PatientController.getPatientDetailsByToken);

// to get a patient by their Id
router.get('/profile/:id', checkToken, PatientController.getPatientById);


router.put('/profile/:patientId/edit', checkToken, PatientController.updatePatientRecord);

// get all patients
router.get('/all', checkToken, PatientController.getAllPatients);

router.get('/records/:patientId', checkToken, PatientController.getAllAdmissionRecordsForAPatientController);

router.get('/prescription/:patientId', checkToken, PatientController.viewPrescription);

router.get('/invoice/:patientId', checkToken, EmployeeController.viewInvoice);


module.exports = router;
