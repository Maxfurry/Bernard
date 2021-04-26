const router = require('express').Router();

const EmployeeController = require('../controllers/EmployeeController');
const  checkToken = require('../middleware/checkToken');

router.post('/login', EmployeeController.Login);

// to create an employee
router.post('/admin/create', checkToken, EmployeeController.createEmployee);

router.delete('/admin/patient/delete/:patientId', checkToken, EmployeeController.deletePatientController);

router.get('/all', checkToken, EmployeeController.getAllEmployee);

// to update an employee details
router.put('/details/update/:employeeDetailsId', checkToken, EmployeeController.updateEmployeeDetails);

module.exports = router;
