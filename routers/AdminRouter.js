const router = require('express').Router();

const AdminController = require('../controllers/AdminController');

router.post('/login', AdminController.Login);

// to create an employee
router.post('/employee/create', AdminController.createEmployee);

// to update an employee details
router.put('/employee/update/:employeeDetailsId', AdminController.updateEmployeeDetails);

module.exports = router;
