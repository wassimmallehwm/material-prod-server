import passport from 'passport';
import passportGoogleOAuth from 'passport-google-oauth';
const GoogleStrategy = passportGoogleOAuth.OAuth2Strategy;

import {config} from '../../config/env/dev'
import User from '../resources/user/user.model';


export const configGoogleStrategy = () => {
    passport.use(new GoogleStrategy(
        {
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callback
        },
        async (accessToken, refreshToken, profile, done) => {
            try{
                const existUser = await User.findOne({'google.id': profile.id});
                if(existUser){
                    return done(null, existUser);
                }

                const user = new User({});
                user.google.id = profile.id;
                user.google.token = accessToken;
                user.google.displayName = profile.displayName;
                user.google.email = profile.emails[0].value;
                await user.save();
                done(null, user);

            } catch(error) {
                console.error(error);
                return done(error);
            }
        }
    ));
}