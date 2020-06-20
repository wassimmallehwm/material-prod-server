import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import { configJWTStrategy } from './passport-jwt';
import { configGoogleStrategy } from './passport.google';
import { config } from '../../config/env/dev';
import session from 'express-session';
import User from '../resources/user/user.model';
import { configFacebookStrategy } from './passport.facebook';

export const globalMiddlewares = (app) => {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, token');
        res.setHeader('Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS, PUT');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    app.use(session({
        secret : config.secretKey,
        resave: true,
        saveUninitialized: true
    }))
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : false}));
    app.use(passport.initialize());
    app.use(passport.session());
    configJWTStrategy();
    configGoogleStrategy();
    configFacebookStrategy();

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    });

    app.get('failure', (req, res) => {
        return res.redirect(config.frontUrl + '/login');
    })
}