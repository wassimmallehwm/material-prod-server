import express from 'express';
import clientController from './client.controller';
import passport from 'passport';
export const clientRouter = express.Router();

clientRouter.route('/').get(
    passport.authenticate('jwt', {session: false}),
    clientController.findAll
);
clientRouter.route('/:id').get(
    passport.authenticate('jwt', {session: false}),
    clientController.findOne
);
clientRouter.route('/:id').put(
    passport.authenticate('jwt', {session: false}),
    clientController.update
);
clientRouter.route('/:id').delete(
    passport.authenticate('jwt', {session: false}),
    clientController.delete
);
clientRouter.route('/').post(
    passport.authenticate('jwt', {session: false}),
    clientController.create
);