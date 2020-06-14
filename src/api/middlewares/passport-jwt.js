import PassportJWT from 'passport-jwt';   
import { config } from '../../config/env/dev';
import User from '../resources/user/user.model';
import passport from 'passport';
export const configJWTStrategy = () => {
    var opts = {}
    opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secretKey;
    
    passport.use(new PassportJWT.Strategy(opts, function(payload, done) {
        User.findOne({_id: payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}