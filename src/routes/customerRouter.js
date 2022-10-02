import express from 'express';
import { allClients,customerId,addCustomer,editCustomer } from '../controllers/customerController.js';
import { verifySchema, verify } from '../middlewares/customerMiddleware.js';

const router = express.Router();

router.get('/', allClients);
router.get('/:id', customerId);
router.use(verifySchema);
router.put('/:id',editCustomer);
router.use(verify);
router.post('/', addCustomer);


export default router;