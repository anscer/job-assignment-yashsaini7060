// src/config/passport.ts
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User, { IUser } from '../models/User';

export default passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username }); 
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validatePassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user: IUser, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});