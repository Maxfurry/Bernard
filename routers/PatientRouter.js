const router = require("express").Router();

const PatientController = require("../controllers/PatientController");

router.post("/", PatientController.register);

module.exports = router;
