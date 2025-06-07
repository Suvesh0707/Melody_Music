import express from 'express';
import passport from 'passport';
import { githubCallback } from '../controllers/userController.js';
import { getMe } from '../controllers/userController.js';
import { protect } from '../middlewares/protectRoute.js';
import { logoutUser } from '../controllers/userController.js';
import { googleCallback } from '../controllers/userController.js';
import { googleAuthSuccess, githubAuthSuccess } from '../controllers/userController.js';
const router = express.Router();

// Github oAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  githubAuthSuccess
);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleAuthSuccess
);

router.get('/me', protect, getMe);
router.get('/logout', logoutUser);

export default router;
