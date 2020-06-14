import express from 'express';
import invoiceController from './invoice.controller';
import passport from 'passport';
export const invoiceRouter = express.Router();

invoiceRouter.route('/').get(
    passport.authenticate('jwt', {session: false}),
    invoiceController.findAll
);
invoiceRouter.route('/:id').get(
    passport.authenticate('jwt', {session: false}),
    invoiceController.findOne
);
invoiceRouter.route('/:id').put(
    passport.authenticate('jwt', {session: false}),
    invoiceController.update
);
invoiceRouter.route('/:id').delete(
    passport.authenticate('jwt', {session: false}),
    invoiceController.delete
);
invoiceRouter.route('/').post(
    passport.authenticate('jwt', {session: false}),
    invoiceController.create
);