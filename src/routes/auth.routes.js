import {Router} from 'express';
import Authentication from '../controllers/auth/signup/signup.auth.controller';
import LoginAuth from '../controllers/auth/login/login.auth.controller';

const router = Router();

router.post('/patient/signup', Authentication.PatientSignup);
router.post('/doctor/signup', Authentication.DoctorSignup);
router.post('/nurse/signup', Authentication.NurseSignup);

router.post('/login', LoginAuth.Login);

export default router;