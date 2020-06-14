import express from 'express';
import { invoiceRouter } from './resources/invoice/index';
import { clientRouter } from './resources/client/index';
import { userRouter } from './resources/user';

export const router = express.Router();

router.use('/invoices', invoiceRouter);
router.use('/clients', clientRouter);
router.use('/users', userRouter);