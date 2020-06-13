import express from 'express';
import clientController from './client.controller';
export const clientRouter = express.Router();

clientRouter.route('/').get(clientController.findAll);
clientRouter.route('/:id').get(clientController.findOne);
clientRouter.route('/:id').put(clientController.update);
clientRouter.route('/:id').delete(clientController.delete);
clientRouter.route('/').post(clientController.create);