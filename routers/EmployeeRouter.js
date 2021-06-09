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


router.post('/prescription/create', checkToken, EmployeeController.createPrescription);

router.put('/prescription/update/:prescriptionId', checkToken, EmployeeController.updatePrescription);

router.post('/timeline/create', checkToken, EmployeeController.createTimeline);

router.post('/timeline/create', checkToken, EmployeeController.createTimeline);

router.get('/timeline/:patientId', checkToken, EmployeeController.viewTimeline);

router.delete('/timeline/:id', checkToken, EmployeeController.deleteTimeline);

router.get('/prescription/:patientId', checkToken, EmployeeController.viewPrescription);


router.post('/invoice/create', checkToken, EmployeeController.createInvoice);

router.get('/invoice/:patientId', checkToken, EmployeeController.viewInvoice);

router.delete('/invoice/delete/:id', checkToken, EmployeeController.deleteInvoice);

router.post('/receipt/create', checkToken, EmployeeController.createReceipt);

router.delete('/receipt/delete/:id', checkToken, EmployeeController.deleteReceipt);

router.get('/receipt/:patientId', checkToken, EmployeeController.viewReciept);



module.exports = router;
