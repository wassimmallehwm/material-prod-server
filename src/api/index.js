import express from 'express';
import { invoiceRouter } from './resources/invoice/index';
import { clientRouter } from './resources/client/index';
import { userRouter } from './resources/user';
import { authRouter } from './resources/auth';

export const router = express.Router();

router.use('/invoices', invoiceRouter);
router.use('/clients', clientRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);