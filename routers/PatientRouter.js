const router = require("express").Router();

const PatientController = require("../controllers/PatientController");

router.post("/auth/signup", PatientController.register);

// to search for a patient
router.get('/search', PatientController.searchForPatient);

// to get a patient by their Id
router.get('/:id', PatientController.getPatientById);

module.exports = router;
