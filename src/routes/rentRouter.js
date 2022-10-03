import express from 'express';
import { validateId, isReturned } from '../middlewares/rentMiddleware.js';
import { newRent, getRentals, returnRental, deletRent } from '../controllers/rentController.js';

const router = express.Router();

router.get('/',getRentals)
router.post('/',newRent);

//router.use(validateId);

//router.use(isReturned);

router.post('/:id/return',returnRental);

router.delete('/:id', deletRent)

export default router;