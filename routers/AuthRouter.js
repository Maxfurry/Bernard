const router = require('express').Router();

const AuthController = require('../controllers/AuthController');
const PatientController = require('../controllers/PatientController');

router.post('/login', AuthController.Login);

router.post('/signup', PatientController.register);

module.exports = router;
