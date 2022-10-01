import {getCategories,postCategories} from '../controllers/categoriesController.js';
import { Router } from 'express';
import express from 'express';
import {isNew, verify} from '../middlewares/categoriesMiddleware.js'

const router = express.Router();

router.get('/', getCategories);

router.use(verify);
router.use(isNew);
router.post('/',postCategories);

export default router;