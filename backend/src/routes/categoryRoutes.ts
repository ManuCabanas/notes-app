import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';

const router = Router();

router.get('/categories', categoryController.listCategories);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

export default router;
