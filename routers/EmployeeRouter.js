const router = require('express').Router();

const EmployeeController = require('../controllers/EmployeeController');
const  checkToken = require('../middleware/checkToken');

router.post('/login', EmployeeController.Login);

// to create an employee
router.post('/admin/create', checkToken, EmployeeController.createEmployee);

router.delete('/admin/patient/delete/:patientId', checkToken, EmployeeController.deletePatientController);

router.get('/all', checkToken, EmployeeController.getAllEmployee);

router.get('/profile/me', checkToken, EmployeeController.getEmployeeProfile);

// to update an employee details
router.put('/details/update/:employeeDetailsId', checkToken, EmployeeController.updateEmployeeDetails);

// to create an employee
router.post('/prescription/create', checkToken, EmployeeController.createPrescription);

router.put('/prescription/update/:prescriptionId', checkToken, EmployeeController.updatePrescription);

router.post('/timeline/create', checkToken, EmployeeController.createTimeline);

module.exports = router;
