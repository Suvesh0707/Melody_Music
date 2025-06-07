import express from 'express';
import { sendMagicLink } from '../controllers/magicController.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
const secret = process.env.JWT_SECRET;


const router = express.Router();

router.post('/send-magic-link', sendMagicLink);

router.get('/verify', (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).send('Token missing');

  try {
    const decoded = jwt.verify(token, secret);

    // Optionally create a new session token here with longer expiry
    const sessionToken = jwt.sign({ email: decoded.email }, secret, { expiresIn: '60d' });

    // Redirect user to frontend URL with session token
    res.redirect(`http://your-frontend-domain.com/login-success?token=${sessionToken}`);
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
});



export default router;
