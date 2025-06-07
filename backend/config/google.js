import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) return done(null, existingUser);

    const newUser = await User.create({
        googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails?.[0]?.value || null,
      avatarUrl: profile.photos?.[0]?.value || null,
      givenName: profile.name?.givenName || null,
      familyName: profile.name?.familyName || null,
      locale: profile._json?.locale || null,
      profileUrl: profile._json?.profile || null,
      gender: profile._json?.gender || null,
    });

    return done(null, newUser);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

