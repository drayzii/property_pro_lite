import { Router as expressRouter } from 'express';
import fileupload from 'express-fileupload';
import propertyController from '../controller/propertyController';

const router = expressRouter();

router.use(fileupload({
  useTempFiles: true,
}));

router.post('/', propertyController.addProperty);
router.patch('/:id', propertyController.updateProperty);

export default router;