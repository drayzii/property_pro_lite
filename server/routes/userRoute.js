import { Router as expressRouter } from 'express';
import userController from '../controller/userController';
import validation from '../middleware/validation';

const router = expressRouter();

router.post('/signup', validation.userValidation, userController.signUp);
// router.post('/signin', validation.emailValidation, validation.passwordValidation, userController.signIn);

export default router;
