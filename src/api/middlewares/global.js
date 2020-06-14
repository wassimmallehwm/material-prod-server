import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import { configJWTStrategy } from './passport-jwt';

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
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : false}));
    app.use(passport.initialize());
    configJWTStrategy();
}