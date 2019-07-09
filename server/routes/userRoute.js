import { Router as expressRouter } from 'express';
import userController from '../controller/userController';

const router = expressRouter();

router.post('/signin', userController.signIn);

export default router;
