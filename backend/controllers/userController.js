import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const githubCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    if (!profile.id) {
      return done(new Error('GitHub profile missing id'), null);
    }

    let user = await User.findOne({ githubId: profile.id });

    if (!user) {
      user = new User({
        githubId: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        avatarUrl: profile.photos?.[0]?.value,
        githubUrl: profile.profileUrl,
        bio: profile._json?.bio,
        location: profile._json?.location,
      });

      await user.save();
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
};



export const googleCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    // Try to find existing user by googleId
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // If not found, create new user
      user = new User({
         googleId: profile.id,
  displayName: profile.displayName,
  firstName: profile.name?.givenName || '',
  lastName: profile.name?.familyName || '',
  email: profile.emails?.[0]?.value,
  avatarUrl: profile.photos?.[0]?.value,
  gender: profile.gender || null,
  locale: profile._json?.locale || null,
  emailVerified: profile._json?.email_verified || false,
  hostedDomain: profile._json?.hd || null,
        // you can add more fields from profile if needed
      });

      await user.save();
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
};


export const getMe = (req, res) => {
  if (!req.user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(req.user);
};

export const logoutUser = (req, res) => {
   req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  });
};


export const githubAuthSuccess = (req, res) => {
  try {
    const user = req.user; // passport attaches user here after successful auth
    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });

    res.redirect('https://suvesh-music-melody.vercel.app/');
  } catch (err) {
    console.error('GitHub Callback Error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

export const googleAuthSuccess = (req, res) => {
  try {
    const user = req.user;
    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    res.redirect('https://suvesh-music-melody.vercel.app/');
  } catch (err) {
    console.error('Google Callback Error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
};
