import express from 'express';
import passport from 'passport';
import authController from './auth.controller';
export const authRouter = express.Router();

authRouter.get('/google',
    passport.authenticate(
        'google',
        { scope: ['profile', 'email'] }
    )
);

authRouter.get('/google/callback',
    passport.authenticate(
        'google',
        { failureRedirect: '/failure' }
    ),
    function (req, res) {
        authController.sendJWTToken(req, res);
    }
);

authRouter.get('/facebook',
    passport.authenticate(
        'facebook',
        { scope: ['email'] }
    )
);

authRouter.get('/facebook/callback',
    passport.authenticate(
        'facebook',
        { failureRedirect: '/failure' }
    ),
    function (req, res) {
        authController.sendJWTToken(req, res);
    }
);