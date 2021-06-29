const router = require('express').Router();

const AdmissionController = require('../controllers/AdmissionController');

router.post('/', AdmissionController.admitPatient);

router.put('/:recordId/update', AdmissionController.updateAdmittedRecord);

router.delete('/:recordId/delete', AdmissionController.deleteAdmissionRecordController);

router.get('/:patientId', AdmissionController.getAdmissionRecordController);

module.exports = router;
