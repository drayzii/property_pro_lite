import { Router as expressRouter } from 'express';
import fileupload from 'express-fileupload';
import propertyController from '../controller/propertyController';
import validation from '../middleware/validation';

const router = expressRouter();

router.use(fileupload({
  useTempFiles: true,
}));

router.post('/', validation.propertyValidation, propertyController.addProperty);
// router.delete('/:id', propertyController.deleteProperty);
router.get('/:id', propertyController.viewSpecificProperty);
// router.get('/', propertyController.viewAllProperties);
// router.patch('/:id/sold', propertyController.markAsSold);
// router.patch('/:id', validation.updateValidation, propertyController.updateProperty);

export default router;
