import express from 'express';
import { allClients } from '../controllers/customerController.js';


const router = express.Router();

router.get('/', allClients);


export default router;