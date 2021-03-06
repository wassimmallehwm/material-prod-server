import passport from 'passport';
import passportFacebookOAuth from 'passport-facebook';
import {config} from '../../config/env/dev'
import User from '../resources/user/user.model';
const FacebookStrategy = passportFacebookOAuth.Strategy;

export const configFacebookStrategy = () => {
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret : config.facebook.clientSecret,
        profileFields : ['id', 'displayName', 'email', 'picture'],
        callbackURL : config.facebook.callback,
        passReqToCallback : true,
        enableProof: true
    }, async (req, token, refreshToken, profile, done) => {
        try{
            console.log(profile.emails[0].value);
            const existUser = await User.findOne({'facebook.id': profile.id});
            if(existUser){
                return done(null, existUser);
            }

            const user = new User({});
            user.facebook.id = profile.id;
            user.facebook.token = token;
            if(profile.emails[0].value){
                user.facebook.email = profile.emails[0].value;
            }
            user.facebook.displayName = profile.displayName;
            await user.save();
            done(null, user);

        } catch(error) {
            console.error(error);
            return done(error);
        }
    }));
}



