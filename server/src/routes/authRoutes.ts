import express from 'express';


import { registerUser, logIn, logOut } from '../controllers/authController';
import { userValidationRules, handleValidationErrors } from '../middlewares/validationMiddleware';

const router = express.Router();


router.post('/register', userValidationRules, handleValidationErrors, registerUser);


router.post('/login', userValidationRules,  handleValidationErrors, logIn);

router.post('/logout', logOut); 

export default router;


