import express from 'express';
import { logInUser, logOutUser, signUpUser, verifyUser } from '../controllers/auth.controllers';

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', logInUser);
router.post('/logout', logOutUser);
router.post('/verify-code', verifyUser);


export default router;