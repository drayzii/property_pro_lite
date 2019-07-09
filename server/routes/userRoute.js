import { Router as expressRouter } from 'express';
import userController from '../controller/userController';

const router = expressRouter();

router.post('/signup', userController.signUp);

export default router;
