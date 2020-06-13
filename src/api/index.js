import express from 'express';
import { invoiceRouter } from './resources/invoice/index';
import { clientRouter } from './resources/client/index';

export const router = express.Router();

router.use('/invoices', invoiceRouter);
router.use('/clients', clientRouter);