import express from 'express';
import invoiceController from './invoice.controller';
export const invoiceRouter = express.Router();

invoiceRouter.route('/').get(invoiceController.findAll);
invoiceRouter.route('/:id').get(invoiceController.findOne);
invoiceRouter.route('/:id').put(invoiceController.update);
invoiceRouter.route('/:id').delete(invoiceController.delete);
invoiceRouter.route('/').post(invoiceController.create);