const router = require('express').Router();

const AdmissionController = require('../controllers/AdmissionController');

router.post('/', AdmissionController.admitPatient);

router.put('/:recordId/update', AdmissionController.updateAdmittedRecord);

router.delete('/:recordId/delete', AdmissionController.deleteAdmissionRecordController);

router.get('/:recordId', AdmissionController.getAdmissionRecordController);

module.exports = router;
