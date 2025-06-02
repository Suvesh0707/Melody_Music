import express from 'express';
import passport from 'passport';
import { githubCallback } from '../controllers/userController.js';
import { getMe } from '../controllers/userController.js';
import { protect } from '../middlewares/protectRoute.js';
import { logoutUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  githubCallback
);

router.get('/me', protect, getMe);
router.get('/logout', logoutUser);

export default router;
