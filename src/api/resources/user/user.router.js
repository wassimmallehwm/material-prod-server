import express from 'express';
import userController from './user.controller';
import passport from 'passport';
export const userRouter = express.Router();

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.post('/test', userController.test);



// userRouter.route('/').get(userController.findAll);
// userRouter.route('/:id').get(userController.findOne);
// userRouter.route('/:id').put(userController.update);
// userRouter.route('/:id').delete(userController.delete);
// userRouter.route('/').post(userController.create);