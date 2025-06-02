import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import User from '../models/userModel.js';


dotenv.config();

// Then your passport.use(...) code...

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const githubId = profile.id.toString();
    const _json = profile._json || {};

    const userData = {
      username: profile.username,
      email: profile.emails?.[0]?.value || null,
      displayName: profile.displayName || _json.name || null,
      avatarUrl: profile.photos?.[0]?.value || _json.avatar_url || null,
      githubUrl: profile.profileUrl || _json.html_url || null,
      bio: _json.bio || null,
      location: _json.location || null,
    };

    const user = await User.findOneAndUpdate(
      { githubId }, 
      {
        $set: userData,
        $setOnInsert: { githubId }
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    return done(null, user);
  } catch (error) {
    console.error("GitHub Strategy Error:", error);
    return done(error);
  }
}));







passport.serializeUser((user, done) => {
  done(null, user.githubId); 
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ githubId: id }); 
    done(null, user);
  } catch (err) {
    done(err);
  }
});

