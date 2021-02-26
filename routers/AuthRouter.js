const router = require('express').Router();

const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.Login);

module.exports = router;
